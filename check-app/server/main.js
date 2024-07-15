import { Meteor } from 'meteor/meteor';
import '../imports/api/employees';
import '../imports/api/checkLogs';
import '../imports/api/methods';
import '../imports/api/publications';
import './api';



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
