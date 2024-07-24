// server/api.js
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { Employees } from '../imports/api/employees';
import { CheckLogs } from '../imports/api/checkLogs';
import bodyParser from 'body-parser';

WebApp.connectHandlers.use(bodyParser.json());

WebApp.connectHandlers.use('/api/user-stats', (req, res, next) => {
  if (req.method === 'GET') {
    const employeeStats = Employees.find().fetch().map((employee) => {
      const logs = CheckLogs.find({ employeeId: employee._id }).fetch();
      const totalTimeWorked = logs.reduce((total, log) => {
        if (log.checkInTimestamp && log.checkOutTimestamp) {
          const checkInTime = new Date(log.checkInTimestamp).getTime();
          const checkOutTime = new Date(log.checkOutTimestamp).getTime();
          const duration = (checkOutTime - checkInTime) / (1000 * 60 * 60); // convert to hours
          return total + duration;
        }
        return total;
      }, 0);

      return {
        employeeId: employee._id,
        fullName: employee.fullName,
        totalTimeWorked: totalTimeWorked.toFixed(2), // convert to string with 2 decimal points
      };
    });

    const totalEmployees = Employees.find().count();

    res.writeHead(200);
    res.end(JSON.stringify({ totalEmployees, employeeStats }));
  } else {
    res.writeHead(405); // Method Not Allowed
    res.end();
  }
});
