import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { Employees } from './employees';
import { CheckLogs } from './checkLogs';

Meteor.methods({
  'employees.insert'(fullName, age, role, contact, email, password) {
    check(fullName, String);
    check(age, Number);
    check(role, String);
    check(contact, String);
    check(email, String);
    check(password, String);

    const userId = Accounts.createUser({
      email,
      password,
      profile: {
        fullName,
        age,
        role,
        contact,
      },
    });

    Employees.insert({
      userId,
      fullName,
      age,
      role,
      contact,
      email,
      createdAt: new Date(),
    });
  },
  'employees.remove'(employeeId) {
    check(employeeId, String);

    const employee = Employees.findOne(employeeId);
    if (employee) {
      Meteor.users.remove(employee.userId);
      Employees.remove(employeeId);
    }
  },
  'employees.update'(employeeId, fullName, age, role, contact, email, password) {
    check(employeeId, String);
    check(fullName, String);
    check(age, Number);
    check(role, String);
    check(contact, String);
    check(email, String);
    check(password, String);

    const employee = Employees.findOne(employeeId);
    if (employee) {
      Employees.update(employeeId, {
        $set: { fullName, age, role, contact, email },
      });
      Meteor.users.update(employee.userId, {
        $set: {
          'profile.fullName': fullName,
          'profile.age': age,
          'profile.role': role,
          'profile.contact': contact,
          'emails.0.address': email,
        },
      });
      Accounts.setPassword(employee.userId, password);
    }
  },
  'checkLogs.insert'(employeeId) {
    check(employeeId, String);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingLog = CheckLogs.findOne({ employeeId, date: today, status: 'Checked in' });

    if (existingLog) {
      CheckLogs.update(existingLog._id, {
        $set: { status: 'Checked out', checkOutTimestamp: new Date() },
      });
      return 'Checked out';
    } else {
      CheckLogs.insert({
        employeeId,
        status: 'Checked in',
        checkInTimestamp: new Date(),
        checkOutTimestamp: null,
        date: today,
      });
      return 'Checked in';
    }
  },
  'checkLogs.getStatus'(employeeId) {
    check(employeeId, String);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const log = CheckLogs.findOne({ employeeId, date: today }, { sort: { checkInTimestamp: -1 } });
    return log ? log.status : 'Not checked in';
  },
});
