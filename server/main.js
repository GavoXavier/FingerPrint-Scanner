import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import './AccountsSetup';

Meteor.startup(() => {
  // Create an admin user if it doesn't exist
  if (!Accounts.findUserByUsername('Admin')) {
    const userId = Accounts.createUser({
      username: 'Admin',
      password: 'password'
    });

    Roles.addUsersToRoles(userId, ['admin']);
  }
});
