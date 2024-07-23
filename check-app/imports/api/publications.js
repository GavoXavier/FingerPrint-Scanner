import { Meteor } from 'meteor/meteor';
import { Employees } from './employees';
import { CheckLogs } from './checkLogs';

Meteor.publish('employees', function employeesPublication() {
  return Employees.find();
});

Meteor.publish('checkLogs', function (startDate, endDate, employeeId, status) {
  const filter = {
    date: {
      $gte: new Date(startDate),
      $lt: new Date(endDate),
    },
    ...(employeeId && { employeeId }),
    ...(status && { status }),
  };
  return CheckLogs.find(filter);
});
