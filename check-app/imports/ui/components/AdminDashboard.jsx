// imports/ui/components/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Meteor } from 'meteor/meteor';
import { CheckLogs } from '../../api/checkLogs';
import { Employees } from '../../api/employees';
import { Tracker } from 'meteor/tracker';
import 'chart.js/auto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminDashboard() {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [weeklyCheckIns, setWeeklyCheckIns] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [availableWeeks, setAvailableWeeks] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(new Date());

  useEffect(() => {
    const handle = Meteor.subscribe('employees');
    const computation = Tracker.autorun(() => {
      if (handle.ready()) {
        setEmployeeCount(Employees.find().count());
      }
    });

    return () => computation.stop();
  }, []);

  useEffect(() => {
    const handle = Meteor.subscribe('checkLogs');
    const computation = Tracker.autorun(() => {
      if (handle.ready()) {
        const logs = CheckLogs.find({}, { sort: { date: -1 } }).fetch();

        // Extract unique weeks with data
        const weeksWithData = logs.reduce((acc, log) => {
          const startOfWeek = new Date(log.date);
          startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
          startOfWeek.setHours(0, 0, 0, 0);

          if (!acc.some(date => date.getTime() === startOfWeek.getTime())) {
            acc.push(startOfWeek);
          }
          return acc;
        }, []);

        setAvailableWeeks(weeksWithData);

        const startOfWeek = new Date(selectedWeek);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);

        const weeklyLogs = CheckLogs.find({
          date: {
            $gte: startOfWeek,
            $lt: endOfWeek,
          },
        }).fetch();

        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const checkInCounts = daysOfWeek.reduce((acc, day) => {
          acc[day] = 0;
          return acc;
        }, {});

        weeklyLogs.forEach(log => {
          const day = daysOfWeek[new Date(log.date).getDay()];
          checkInCounts[day]++;
        });

        setWeeklyCheckIns(checkInCounts);

        const employees = Employees.find().fetch();
        const employeeMinutes = employees.map(employee => {
          const employeeLogs = weeklyLogs.filter(log => log.employeeId === employee._id);
          const totalMinutes = employeeLogs.reduce((acc, log) => {
            if (log.checkInTimestamp && log.checkOutTimestamp) {
              const checkIn = new Date(log.checkInTimestamp);
              const checkOut = new Date(log.checkOutTimestamp);
              const minutes = (checkOut - checkIn) / (1000 * 60);
              acc += minutes;
            }
            return acc;
          }, 0);
          return { ...employee, totalMinutes };
        });

        employeeMinutes.sort((a, b) => b.totalMinutes - a.totalMinutes);
        setLeaderboard(employeeMinutes);
      }
    });

    return () => computation.stop();
  }, [selectedWeek]);

  const weeklyData = {
    labels: Object.keys(weeklyCheckIns),
    datasets: [
      {
        label: 'Check Ins',
        data: Object.values(weeklyCheckIns),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const handleWeekChange = (date) => {
    setSelectedWeek(date);
  };

  return (
    <div className="admin-dashboard">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Employees</h2>
          <p className="text-3xl">{employeeCount}</p>
        </div>

        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">Weekly Check-Ins</h2>
          <DatePicker
            selected={selectedWeek}
            onChange={handleWeekChange}
            className="px-4 py-2 border rounded-md"
            showWeekNumbers
            dateFormat="MM/dd/yyyy"
            placeholderText="Select week"
          />
          <Bar data={weeklyData} options={{ responsive: true }} />
        </div>

        <div className="bg-white p-4 rounded-md shadow-md col-span-2">
          <h2 className="text-xl font-semibold mb-2">Employee Leaderboard</h2>
          <table className="min-w-full bg-white border rounded-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Employee</th>
                <th className="py-2 px-4 border-b text-left">Role</th>
                <th className="py-2 px-4 border-b text-left">Minutes Clocked</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((employee) => (
                <tr key={employee._id}>
                  <td className="py-2 px-4 border-b text-left">{employee.fullName}</td>
                  <td className="py-2 px-4 border-b text-left">{employee.role}</td>
                  <td className="py-2 px-4 border-b text-left">{employee.totalMinutes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

