import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import bodyParser from 'body-parser';
import '../imports/api/employees';
import '../imports/api/checkLogs';
import '../imports/api/methods';
import '../imports/api/publications';
import { Employees } from '../imports/api/employees';
import { CheckLogs } from '../imports/api/checkLogs';

Meteor.startup(() => {
  // Initialization code here

  // Check if admin user exists, and if not, create it
  if (!Meteor.users.findOne({ 'emails.address': 'admin@example.com' })) {
    Accounts.createUser({
      email: 'admin@example.com',
      password: '123',
      profile: {
        fullName: 'Admin',
        age: 0,
        role: 'Admin',
        contact: '',
      },
    });
  }
});

// Middleware to parse JSON request body
WebApp.connectHandlers.use(bodyParser.json());

// API route to receive username from C++ app
WebApp.connectHandlers.use('/api/v1/verify', (req, res, next) => {
  if (req.method !== 'POST') {
    res.writeHead(405); // Method Not Allowed
    res.end();
    return;
  }

  const { username } = req.body;

  if (!username) {
    res.writeHead(400, { 'Content-Type': 'application/json' }); // Bad Request
    res.end(JSON.stringify({ error: 'Username is required' }));
    return;
  }

  // Check if the username exists in the Employees collection
  const employee = Employees.findOne({ username });

  if (!employee) {
    res.writeHead(404, { 'Content-Type': 'application/json' }); // Not Found
    res.end(JSON.stringify({ error: 'Employee not found' }));
    return;
  }

  // Proceed with the check-in/out logic
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existingLog = CheckLogs.findOne({ employeeId: employee._id, date: today, status: 'Checked in' });

  if (existingLog) {
    CheckLogs.update(existingLog._id, {
      $set: { status: 'Checked out', checkOutTimestamp: new Date() },
    });
    res.writeHead(200, { 'Content-Type': 'application/json' }); // OK
    res.end(JSON.stringify({ status: 'Checked out', username }));
  } else {
    CheckLogs.insert({
      employeeId: employee._id,
      status: 'Checked in',
      checkInTimestamp: new Date(),
      checkOutTimestamp: null,
      date: today,
    });
    res.writeHead(200, { 'Content-Type': 'application/json' }); // OK
    res.end(JSON.stringify({ status: 'Checked in', username }));
  }
});
