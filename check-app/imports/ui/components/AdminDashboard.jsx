import React, { useState, useEffect } from 'react';
import { Tracker } from 'meteor/tracker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Employees } from '../../api/employees';
import { CheckLogs } from '../../api/checkLogs';

export default function AdminDashboard() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [employeeStats, setEmployeeStats] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [checkInsByWeek, setCheckInsByWeek] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    Tracker.autorun(() => {
      setTotalEmployees(Employees.find().count());
    });
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      const employee = Employees.findOne({ _id: selectedEmployee });
      if (employee) {
        const checkLogs = CheckLogs.find({ employeeId: selectedEmployee }).fetch();
        const totalTimeWorked = checkLogs.reduce((acc, log) => {
          if (log.checkInTimestamp && log.checkOutTimestamp) {
            return acc + (new Date(log.checkOutTimestamp) - new Date(log.checkInTimestamp));
          }
          return acc;
        }, 0);
        const daysWorked = new Set(checkLogs.map(log => log.date.toDateString())).size;
        const dailyAverage = totalTimeWorked / daysWorked / (1000 * 60 * 60); // in hours

        setEmployeeStats({
          fullName: employee.fullName,
          totalTimeWorked: (totalTimeWorked / (1000 * 60 * 60)).toFixed(2), // in hours
          dailyAverage: dailyAverage.toFixed(2) // in hours
        });
      }
    } else {
      setEmployeeStats({});
    }
  }, [selectedEmployee]);

  useEffect(() => {
    const employees = Employees.find().fetch();
    const leaderboardData = employees.map(employee => {
      const checkLogs = CheckLogs.find({ employeeId: employee._id }).fetch();
      const totalTimeWorked = checkLogs.reduce((acc, log) => {
        if (log.checkInTimestamp && log.checkOutTimestamp) {
          return acc + (new Date(log.checkOutTimestamp) - new Date(log.checkInTimestamp));
        }
        return acc;
      }, 0);
      return {
        employeeId: employee._id,
        fullName: employee.fullName,
        hoursWorked: (totalTimeWorked / (1000 * 60 * 60)).toFixed(2) // in hours
      };
    }).sort((a, b) => b.hoursWorked - a.hoursWorked);

    setLeaderboard(leaderboardData);
  }, []);

  useEffect(() => {
    const startOfStartDate = new Date(startDate);
    startOfStartDate.setHours(0, 0, 0, 0);
    const endOfEndDate = new Date(endDate);
    endOfEndDate.setHours(23, 59, 59, 999);

    const filter = {
      date: {
        $gte: startOfStartDate,
        $lt: endOfEndDate,
      },
    };

    const checkLogs = CheckLogs.find(filter).fetch();
    const groupedByWeek = {};

    checkLogs.forEach(log => {
      const weekNumber = getWeekNumber(new Date(log.date));
      if (!groupedByWeek[weekNumber]) {
        groupedByWeek[weekNumber] = 0;
      }
      groupedByWeek[weekNumber] += 1;
    });

    setCheckInsByWeek(groupedByWeek);
  }, [startDate, endDate]);

  const getWeekNumber = (date) => {
    const firstJan = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - firstJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((date.getDay() + 1 + days) / 7);
  };

  return (
    <div className="admin-dashboard">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-4 flex space-x-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="px-4 py-2 border rounded-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="p-4 border rounded-md shadow-md">
          <h2 className="text-xl font-bold">Total Employees</h2>
          <p className="text-3xl">{totalEmployees}</p>
        </div>
        <div className="p-4 border rounded-md shadow-md">
          <h2 className="text-xl font-bold">Select Employee</h2>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="block w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select Employee</option>
            {Employees.find().fetch().map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.fullName}
              </option>
            ))}
          </select>
          {selectedEmployee && (
            <div className="mt-4">
              <h3 className="text-lg font-bold">Employee Stats</h3>
              <p><strong>Full Name:</strong> {employeeStats.fullName}</p>
              <p><strong>Total Time Worked:</strong> {employeeStats.totalTimeWorked} hours</p>
              <p><strong>Daily Average Hours:</strong> {employeeStats.dailyAverage} hours</p>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 border rounded-md shadow-md mb-4">
        <h2 className="text-xl font-bold">Employee Leaderboard</h2>
        <table className="min-w-full bg-white border rounded-md" style={{ tableLayout: 'fixed' }}>
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b text-center">Rank</th>
              <th className="py-2 px-4 border-b text-center">Full Name</th>
              <th className="py-2 px-4 border-b text-center">Total Hours Worked</th>
            </tr>
          </thead>
          <tbody className="font-worksans text-black">
            {leaderboard.map((entry, index) => (
              <tr
                key={entry.employeeId}
                className={
                  index === 0 ? 'bg-yellow-100' :
                  index === 1 ? 'bg-gray-100' :
                  index === 2 ? 'bg-orange-100' : ''
                }
              >
                <td className="py-2 px-4 border-b text-center">{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}</td>
                <td className="py-2 px-4 border-b text-center">{entry.fullName}</td>
                <td className="py-2 px-4 border-b text-center">{entry.hoursWorked}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Weekly Check-ins</h2>
        <Bar
          data={{
            labels: Object.keys(checkInsByWeek),
            datasets: [
              {
                label: 'Number of Check-ins',
                data: Object.values(checkInsByWeek),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Week',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Check-ins',
                },
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
