import React, { useState, useEffect } from 'react';
import { CheckLogs } from '../../api/checkLogs';
import { Employees } from '../../api/employees';
import { Tracker } from 'meteor/tracker';

export default function ApprovalRequests() {
  const [approvalRequests, setApprovalRequests] = useState([]);

  useEffect(() => {
    const handle = Meteor.subscribe('checkLogs');
    const employeeHandle = Meteor.subscribe('employees');
    const computation = Tracker.autorun(() => {
      if (handle.ready() && employeeHandle.ready()) {
        const requests = CheckLogs.find({ status: 'Checked out' }).fetch();
        const requestsWithEmployeeDetails = requests.map((request) => {
          const employee = Employees.findOne({ fingerprintId: request.fingerprintId });
          return { ...request, employee };
        });
        setApprovalRequests(requestsWithEmployeeDetails);
      }
    });

    return () => computation.stop();
  }, []);

  const handleApprove = (fingerprintId) => {
    Meteor.call('checkLogs.approveReLogin', fingerprintId, (error) => {
      if (error) {
        alert(`Error: ${error.reason}`);
      } else {
        alert('Re-login approved.');
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Approval Requests</h1>
      <table className="min-w-full bg-white border rounded-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Full Names</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Request Time</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {approvalRequests.map((request) => (
            <tr key={request._id}>
              <td className="py-2 px-4 border-b">{request.employee?.fullName}</td>
              <td className="py-2 px-4 border-b">{request.employee?.role}</td>
              <td className="py-2 px-4 border-b">{new Date(request.timestamp).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleApprove(request.fingerprintId)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Approve
                </button>
                {/* Implement reject functionality if needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}