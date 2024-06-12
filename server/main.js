import { Meteor } from 'meteor/meteor';
import '../imports/api/Sessions';
import '../imports/api/Bookings';
import '../imports/api/methods';
import './Publications';
import './AccountsSetup';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername('Admin')) {
    const userId = Accounts.createUser({
      username: 'Admin',
      password: 'password',
    });

    Roles.addUsersToRoles(userId, ['admin']);
  }
});
