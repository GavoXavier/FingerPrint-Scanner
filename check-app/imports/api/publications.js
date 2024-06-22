import { Meteor } from 'meteor/meteor';
import { Employees } from './employees';
import { CheckLogs } from './checkLogs';

Meteor.publish('employees', function employeesPublication() {
  return Employees.find();
});

Meteor.publish('checkLogs', function checkLogsPublication() {
  return CheckLogs.find();
});
