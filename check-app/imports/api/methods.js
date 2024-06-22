import { Meteor } from 'meteor/meteor';
import { Employees } from './employees';
import { CheckLogs } from './checkLogs';
import { check } from 'meteor/check';

Meteor.methods({
  'employees.insert'(profilePicture, fullName, age, role, contact, fingerprintId) {
    check(profilePicture, String);
    check(fullName, String);
    check(age, Number);
    check(role, String);
    check(contact, String);
    check(fingerprintId, String);

    Employees.insert({
      profilePicture,
      fullName,
      age,
      role,
      contact,
      fingerprintId,
      createdAt: new Date(),
    });
  },
  'employees.remove'(employeeId) {
    check(employeeId, String);

    Employees.remove(employeeId);
  },
  'employees.update'(employeeId, profilePicture, fullName, age, role, contact, fingerprintId) {
    check(employeeId, String);
    check(profilePicture, String);
    check(fullName, String);
    check(age, Number);
    check(role, String);
    check(contact, String);
    check(fingerprintId, String);

    Employees.update(employeeId, { $set: { profilePicture, fullName, age, role, contact, fingerprintId } });
  },
  'checkLogs.insert'(fingerprintId) {
    check(fingerprintId, String);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingLog = CheckLogs.findOne({ fingerprintId, date: today, status: 'Checked in' });

    if (existingLog) {
      CheckLogs.update(existingLog._id, {
        $set: { status: 'Checked out', checkOutTimestamp: new Date() }
      });
      return 'Checked out';
    } else {
      CheckLogs.insert({
        fingerprintId,
        status: 'Checked in',
        checkInTimestamp: new Date(),
        checkOutTimestamp: null,
        date: today,
      });
      return 'Checked in';
    }
  },
  'checkLogs.getStatus'(fingerprintId) {
    check(fingerprintId, String);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const log = CheckLogs.findOne({ fingerprintId, date: today }, { sort: { checkInTimestamp: -1 } });
    return log ? log.status : 'Not checked in';
  }
});
