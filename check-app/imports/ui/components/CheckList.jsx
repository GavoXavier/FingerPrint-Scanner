import React, { useState, useEffect } from 'react';
import { CheckLogs } from '../../api/checkLogs';
import { Employees } from '../../api/employees';
import { Tracker } from 'meteor/tracker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CheckList() {
  const [checkLogs, setCheckLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const handle = Meteor.subscribe('employees');
    const computation = Tracker.autorun(() => {
      if (handle.ready()) {
        const fetchedEmployees = Employees.find().fetch();
        setEmployees(fetchedEmployees);
      }
    });

    return () => computation.stop();
  }, []);

  useEffect(() => {
    const handle = Meteor.subscribe('checkLogs');
    const employeeHandle = Meteor.subscribe('employees');
    const computation = Tracker.autorun(() => {
      if (handle.ready() && employeeHandle.ready()) {
        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 59, 59, 999);

        const filter = {
          date: {
            $gte: startOfDay,
            $lt: endOfDay,
          },
          ...(selectedEmployee && { employeeId: selectedEmployee }),
          ...(selectedStatus && { status: selectedStatus }),
        };

        const logs = CheckLogs.find(filter, { sort: { checkInTimestamp: -1 } }).fetch();
        const logsWithEmployeeDetails = logs.map((log) => {
          const employee = Employees.findOne({ _id: log.employeeId });
          return { ...log, employee };
        });
        setCheckLogs(logsWithEmployeeDetails);
      }
    });

    return () => computation.stop();
  }, [selectedDate, selectedEmployee, selectedStatus]);

  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Check Logs</h1>
      <div className="mb-4 flex space-x-4">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="px-4 py-2 border rounded-md"
        />
        <select
          value={selectedEmployee}
          onChange={handleEmployeeChange}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Employees</option>
          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.fullName}
            </option>
          ))}
        </select>
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Status</option>
          <option value="Checked in">Checked In</option>
          <option value="Checked out">Checked Out</option>
        </select>
      </div>
      <table className="min-w-full bg-white border rounded-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Full Names</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Checked In</th>
            <th className="py-2 px-4 border-b">Checked Out</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {checkLogs.map((log) => (
            <tr key={log._id}>
              <td className="py-2 px-4 border-b">{log.employee?.fullName}</td>
              <td className="py-2 px-4 border-b">{log.employee?.role}</td>
              <td className="py-2 px-4 border-b">{log.checkInTimestamp ? new Date(log.checkInTimestamp).toLocaleString() : ''}</td>
              <td className="py-2 px-4 border-b">{log.checkOutTimestamp ? new Date(log.checkOutTimestamp).toLocaleString() : ''}</td>
              <td className="py-2 px-4 border-b">
                <span className={`px-4 py-2 ${log.status === 'Checked in' ? 'bg-green-500' : 'bg-red-500'} text-white rounded-md`}>
                  {log.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
