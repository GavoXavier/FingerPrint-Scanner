// imports/ui/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Employees } from '../../api/employees';
import { CheckLogs } from '../../api/checkLogs';
import { Tracker } from 'meteor/tracker';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function AdminDashboard() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [employeeStats, setEmployeeStats] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [weeklyCheckIns, setWeeklyCheckIns] = useState([]);

  useEffect(() => {
    const handle = Meteor.subscribe('employees');
    const computation = Tracker.autorun(() => {
      if (handle.ready()) {
        const fetchedEmployees = Employees.find().fetch();
        setTotalEmployees(fetchedEmployees.length);
      }
    });

    return () => computation.stop();
  }, []);

  useEffect(() => {
    const handle = Meteor.subscribe('employees');
    const logsHandle = Meteor.subscribe('checkLogs', startDate, endDate);
    const computation = Tracker.autorun(() => {
      if (handle.ready() && logsHandle.ready()) {
        const startOfStartDate = new Date(startDate);
        startOfStartDate.setHours(0, 0, 0, 0);
        const endOfEndDate = new Date(endDate);
        endOfEndDate.setHours(23, 59, 59, 999);

        const employees = Employees.find().fetch();

        const employeeStats = employees.map((employee) => {
          const logs = CheckLogs.find({
            employeeId: employee._id,
            date: {
              $gte: startOfStartDate,
              $lt: endOfEndDate,
            },
          }).fetch();

          const totalTimeWorked = logs.reduce((total, log) => {
            if (log.checkInTimestamp && log.checkOutTimestamp) {
              const checkInTime = new Date(log.checkInTimestamp).getTime();
              const checkOutTime = new Date(log.checkOutTimestamp).getTime();
              const duration = (checkOutTime - checkInTime) / (1000 * 60 * 60); // convert to hours
              return total + duration;
            }
            return total;
          }, 0);

          return {
            employeeId: employee._id,
            fullName: employee.fullName,
            hoursWorked: totalTimeWorked.toFixed(2), // convert to string with 2 decimal points
          };
        });

        setEmployeeStats(employeeStats);
      }
    });

    return () => computation.stop();
  }, [startDate, endDate]);

  useEffect(() => {
    if (selectedEmployee) {
      const employee = Employees.findOne({ _id: selectedEmployee });
      if (employee) {
        const logs = CheckLogs.find({ employeeId: employee._id }).fetch();
        const totalTimeWorked = logs.reduce((total, log) => {
          if (log.checkInTimestamp && log.checkOutTimestamp) {
            const checkInTime = new Date(log.checkInTimestamp).getTime();
            const checkOutTime = new Date(log.checkOutTimestamp).getTime();
            const duration = (checkOutTime - checkInTime) / (1000 * 60 * 60); // convert to hours
            return total + duration;
          }
          return total;
        }, 0);

        const dailyAverage = (totalTimeWorked / logs.length).toFixed(2);

        setEmployeeDetails({
          fullName: employee.fullName,
          totalTimeWorked: totalTimeWorked.toFixed(2),
          dailyAverage,
        });
      }
    } else {
      setEmployeeDetails(null);
    }
  }, [selectedEmployee]);

  useEffect(() => {
    // Calculate the start and end dates of the week based on the selected start date
    const startOfWeek = new Date(startDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const handle = Meteor.subscribe('checkLogs', startOfWeek, endOfWeek);
    const computation = Tracker.autorun(() => {
      if (handle.ready()) {
        const logs = CheckLogs.find({
          date: {
            $gte: startOfWeek,
            $lt: endOfWeek,
          },
        }).fetch();

        const checkInsByDay = Array(7).fill(0);
        logs.forEach((log) => {
          const day = new Date(log.date).getDay();
          checkInsByDay[day]++;
        });

        setWeeklyCheckIns(checkInsByDay);
      }
    });

    return () => computation.stop();
  }, [startDate]);

  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
  };

  const leaderboard = employeeStats.sort((a, b) => b.hoursWorked - a.hoursWorked);

  return (
    <div className="admin-dashboard">
      <div className="flex justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Total Employees: {totalEmployees}</h1>
        </div>
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
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Select Employee</label>
          <select
            value={selectedEmployee}
            onChange={handleEmployeeChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">All Employees</option>
            {employeeStats.map((employee) => (
              <option key={employee.employeeId} value={employee.employeeId}>
                {employee.fullName}
              </option>
            ))}
          </select>
        </div>
      </div>
      {employeeDetails && (
        <div className="bg-white shadow-md rounded-md p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Employee Details</h2>
          <p><strong>Full Name:</strong> {employeeDetails.fullName}</p>
          <p><strong>Total Time Worked:</strong> {employeeDetails.totalTimeWorked} hours</p>
          <p><strong>Daily Average Hours:</strong> {employeeDetails.dailyAverage} hours</p>
        </div>
      )}
      <div className="bg-white shadow-md rounded-md p-4 mb-4">
        <h2 className="text-xl font-bold mb-2">Employee Leaderboard</h2>
        <table className="min-w-full bg-white border rounded-md" style={{ tableLayout: 'fixed' }}>
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b" style={{ width: '70%' }}>Full Names</th>
              <th className="py-2 px-4 border-b" style={{ width: '30%' }}>Total Hours Worked</th>
            </tr>
          </thead>
          <tbody className="font-worksans text-black">
            {leaderboard.map((entry, index) => (
              <tr
                key={entry.employeeId}
                className={index === 0 ? 'bg-yellow-100' : index === 1 ? 'bg-gray-100' : index === 2 ? 'bg-orange-100' : ''}
              >
                <td className="py-2 px-4 border-b text-justify">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''} {entry.fullName}
                </td>
                <td className="py-2 px-4 border-b text-justify">{entry.hoursWorked}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white shadow-md rounded-md p-4">
        <h2 className="text-xl font-bold mb-2">Weekly Check-ins</h2>
        <Bar
          data={{
            labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            datasets: [{
              label: 'Check-ins',
              data: weeklyCheckIns,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
