import React, { useState, useEffect, useRef } from 'react';
import { CheckLogs } from '../../api/checkLogs';
import { Employees } from '../../api/employees';
import { Tracker } from 'meteor/tracker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactToPrint from 'react-to-print';
import { CSVLink } from 'react-csv';
import moment from 'moment';

export default function CheckList() {
  const [checkLogs, setCheckLogs] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [totalHours, setTotalHours] = useState(0);
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

        if (selectedEmployee) {
          const totalMinutes = logs.reduce((acc, log) => acc + Math.floor((new Date(log.checkOutTimestamp) - new Date(log.checkInTimestamp)) / (1000 * 60)), 0);
          setTotalHours((totalMinutes / 60).toFixed(2));
        } else {
          setTotalHours(0);
        }
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

  const csvData = [
    ["Full Names", "Role", "Checked In", "Checked Out", "Status"],
    ...checkLogs.map(log => [
      log.employee?.fullName,
      log.employee?.role,
      log.checkInTimestamp ? new Date(log.checkInTimestamp).toLocaleString() : '',
      log.checkOutTimestamp ? new Date(log.checkOutTimestamp).toLocaleString() : '',
      log.status
    ])
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Attendance Report</h1>
      <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
        <div className="mb-4 md:mb-0">
          <label className="block mb-2 text-sm font-medium text-gray-700">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4 md:mb-0">
          <label className="block mb-2 text-sm font-medium text-gray-700">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4 md:mb-0">
          <label className="block mb-2 text-sm font-medium text-gray-700">Employee</label>
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
        </div>
        <div className="mb-4 md:mb-0">
          <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
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
        <div className="mb-4 md:mb-0 flex flex-col justify-end space-y-2">
          <ReactToPrint
            trigger={() => <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Print</button>}
            content={() => componentRef.current}
          />
          <CSVLink
            data={csvData}
            filename={"attendance-report.csv"}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Download CSV
          </CSVLink>
        </div>
      </div>
      <div ref={componentRef} className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-2 text-center">Attendance Report</h2>
        <p className="text-sm mb-2 text-center">
          <strong>Date generated:</strong> {new Date().toLocaleString()}
        </p>
        <p className="text-sm mb-2 text-center">
          <strong>Date range selected:</strong> {moment(startDate).format('MM/DD/YYYY')} - {moment(endDate).format('MM/DD/YYYY')}
        </p>
        {selectedEmployee && (
          <p className="text-sm mb-2 text-center">
            <strong>Specific User:</strong> {employees.find(emp => emp._id === selectedEmployee)?.fullName} <br />
            <strong>Total Hours Worked:</strong> {totalHours} hours
          </p>
        )}
        <table className="min-w-full bg-white border rounded-md" style={{ tableLayout: 'fixed' }}>
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b" style={{ width: '20%' }}>Full Names</th>
              <th className="py-2 px-4 border-b" style={{ width: '15%' }}>Role</th>
              <th className="py-2 px-4 border-b" style={{ width: '25%' }}>Checked In</th>
              <th className="py-2 px-4 border-b" style={{ width: '25%' }}>Checked Out</th>
              <th className="py-2 px-4 border-b" style={{ width: '15%' }}>Status</th>
            </tr>
          </thead>
          <tbody className="font-worksans text-black">
            {checkLogs.map((log) => (
              <tr key={log._id}>
                <td className="py-2 px-4 border-b text-justify">{log.employee?.fullName}</td>
                <td className="py-2 px-4 border-b text-justify">{log.employee?.role}</td>
                <td className="py-2 px-4 border-b text-justify">{log.checkInTimestamp ? new Date(log.checkInTimestamp).toLocaleString() : ''}</td>
                <td className="py-2 px-4 border-b text-justify">{log.checkOutTimestamp ? new Date(log.checkOutTimestamp).toLocaleString() : ''}</td>
                <td className="py-2 px-4 border-b text-justify">
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
  );
}
