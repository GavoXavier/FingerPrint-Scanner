import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Employees } from './employees';
import { CheckLogs } from './checkLogs';

Meteor.methods({
  'employees.insert'(username, fullName, age, role, contact) {
    check(username, String);
    check(fullName, String);
    check(age, Number);
    check(role, String);
    check(contact, String);

    if (Employees.findOne({ username })) {
      throw new Meteor.Error('Username already exists');
    }

    Employees.insert({
      username,
      fullName,
      age,
      role,
      contact,
      createdAt: new Date(),
    });
  },

  'employees.remove'(employeeId) {
    check(employeeId, String);

    Employees.remove(employeeId);
  },

  'employees.update'(employeeId, username, fullName, age, role, contact) {
    check(employeeId, String);
    check(username, String);
    check(fullName, String);
    check(age, Number);
    check(role, String);
    check(contact, String);

    Employees.update(employeeId, {
      $set: { username, fullName, age, role, contact },
    });
  },

  'checkLogs.insert'(username) {
    check(username, String);

    const employee = Employees.findOne({ username });
    if (!employee) {
      throw new Meteor.Error('Employee not found');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingLog = CheckLogs.findOne({ employeeId: employee._id, date: today, status: 'Checked in' });

    if (existingLog) {
      CheckLogs.update(existingLog._id, {
        $set: { status: 'Checked out', checkOutTimestamp: new Date() },
      });
      return 'Checked out';
    } else {
      CheckLogs.insert({
        employeeId: employee._id,
        status: 'Checked in',
        checkInTimestamp: new Date(),
        checkOutTimestamp: null,
        date: today,
      });
      return 'Checked in';
    }
  },

  'checkLogs.getStatus'(username) {
    check(username, String);

    const employee = Employees.findOne({ username });
    if (!employee) {
      throw new Meteor.Error('Employee not found');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const log = CheckLogs.findOne({ employeeId: employee._id, date: today }, { sort: { checkInTimestamp: -1 } });
    return log ? log.status : 'Not checked in';
  },
});
