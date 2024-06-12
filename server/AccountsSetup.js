import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

Accounts.onCreateUser((options, user) => {
  user.profile = options.profile || {};
  user.roles = [];
  user.profile.walletBalance = 0; // Initialize wallet balance to 0

  if (options.username === "Admin") {
    user.roles.push('admin');
  } else {
    user.roles.push('user');
  }

  if (options.profile && options.profile.picture) {
    user.profile.picture = options.profile.picture;
  }

  return user;
});

Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  } else {
    this.ready();
  }
});
