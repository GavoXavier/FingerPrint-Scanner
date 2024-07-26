import React, { useState, useEffect } from 'react';
import { Employees } from '../../api/employees';
import { Tracker } from 'meteor/tracker';
import { CheckLogs } from '../../api/checkLogs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal';
import EmployeeDetails from './EmployeeDetails';
import EditEmployee from './EditEmployee';

export default function EmployeeListContainer() {
  const [employees, setEmployees] = useState([]);
  const [checkLogs, setCheckLogs] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState(null);

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
    const computation = Tracker.autorun(() => {
      if (handle.ready()) {
        const logs = CheckLogs.find({}, { sort: { checkInTimestamp: -1 } }).fetch();
        setCheckLogs(logs);
      }
    });

    return () => computation.stop();
  }, []);

  const handleRemove = (employeeId, fullName) => {
    const confirmed = window.confirm(`Are you sure you want to remove ${fullName} from the system?`);
    if (confirmed) {
      Meteor.call('employees.remove', employeeId, (error) => {
        if (error) {
          toast.error('Error removing employee: ' + error.reason);
        } else {
          toast.success(`${fullName} has been removed from the system.`);
        }
      });
    }
  };

  const handleCardClick = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleViewDetails = () => {
    setViewMode('details');
  };

  const handleEditDetails = () => {
    setViewMode('edit');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setViewMode(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Employee List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {employees.map((employee) => (
            <div
              key={employee._id}
              className="relative p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
              onClick={() => handleCardClick(employee)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-20 blur-md"></div>
              <div className="relative flex items-center space-x-4">
                <img
                  src="/user.webp"
                  alt="Profile"
                  className="w-16 h-16 rounded-full border-2 border-gray-300"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{employee.fullName}</h3>
                  <p className="text-gray-600 dark:text-gray-400">Role: {employee.role}</p>
                  <p className="text-gray-600 dark:text-gray-400">Age: {employee.age}</p>
                  <p className="text-gray-600 dark:text-gray-400">Contact: {employee.contact}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(employee._id, employee.fullName);
                }}
                className="relative mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {viewMode === null && (
          <div className="flex flex-col space-y-4">
            <button onClick={handleViewDetails} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              View Details
            </button>
            <button onClick={handleEditDetails} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
              Edit
            </button>
          </div>
        )}
        {viewMode === 'details' && <EmployeeDetails employee={selectedEmployee} onClose={handleCloseModal} />}
        {viewMode === 'edit' && <EditEmployee employee={selectedEmployee} onClose={handleCloseModal} />}
      </Modal>
    </div>
  );
}
