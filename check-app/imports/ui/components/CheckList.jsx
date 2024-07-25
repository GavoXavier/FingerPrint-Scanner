import React, { useState, useEffect, useRef } from 'react';
import { CheckLogs } from '../../api/checkLogs';
import { Employees } from '../../api/employees';
import { Tracker } from 'meteor/tracker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactToPrint from 'react-to-print';
import { CSVLink } from 'react-csv';

export default function CheckList() {
  const [checkLogs, setCheckLogs] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const componentRef = useRef();

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
    const handle = Meteor.subscribe('checkLogs', startDate, endDate);
    const employeeHandle = Meteor.subscribe('employees');
    const computation = Tracker.autorun(() => {
      if (handle.ready() && employeeHandle.ready()) {
        const startOfStartDate = new Date(startDate);
        startOfStartDate.setHours(0, 0, 0, 0);
        const endOfEndDate = new Date(endDate);
        endOfEndDate.setHours(23, 59, 59, 999);

        const filter = {
          date: {
            $gte: startOfStartDate,
            $lt: endOfEndDate,
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
  }, [startDate, endDate, selectedEmployee, selectedStatus]);

  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const csvData = checkLogs.map(log => ({
    fullName: log.employee?.fullName,
    role: log.employee?.role,
    checkIn: log.checkInTimestamp ? new Date(log.checkInTimestamp).toLocaleString() : '',
    checkOut: log.checkOutTimestamp ? new Date(log.checkOutTimestamp).toLocaleString() : '',
    status: log.status,
  }));

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="container mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-70 dark:bg-opacity-70">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Check Logs</h1>
        <div className="mb-4 flex flex-wrap space-y-4 md:space-y-0 md:space-x-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="px-4 py-2 border rounded-md bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="px-4 py-2 border rounded-md bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Employee</label>
            <select
              value={selectedEmployee}
              onChange={handleEmployeeChange}
              className="px-4 py-2 border rounded-md bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
            >
              <option value="">All Employees</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.fullName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="px-4 py-2 border rounded-md bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
            >
              <option value="">All Status</option>
              <option value="Checked in">Checked In</option>
              <option value="Checked out">Checked Out</option>
            </select>
          </div>
          <ReactToPrint
            trigger={() => <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Print</button>}
            content={() => componentRef.current}
          />
          <CSVLink data={csvData} filename={"check_logs.csv"} className="px-4 py-2 bg-green-500 text-white rounded-md">Download CSV</CSVLink>
        </div>
        <div ref={componentRef}>
          <table className="min-w-full bg-white dark:bg-gray-800 border rounded-md mt-6">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">Full Names</th>
                <th className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">Role</th>
                <th className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">Checked In</th>
                <th className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">Checked Out</th>
                <th className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">Status</th>
              </tr>
            </thead>
            <tbody>
              {checkLogs.map((log) => (
                <tr key={log._id} className="bg-white dark:bg-gray-800">
                  <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">{log.employee?.fullName}</td>
                  <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">{log.employee?.role}</td>
                  <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">{log.checkInTimestamp ? new Date(log.checkInTimestamp).toLocaleString() : ''}</td>
                  <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">{log.checkOutTimestamp ? new Date(log.checkOutTimestamp).toLocaleString() : ''}</td>
                  <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">
                    <span className={`px-4 py-2 ${log.status === 'Checked in' ? 'bg-green-500' : 'bg-red-500'} text-white rounded-md`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
