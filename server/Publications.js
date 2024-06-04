import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.publish('userData', function() {
  if (!this.userId) {
    return this.ready();
  }

  if (Roles.userIsInRole(this.userId, 'admin')) {
    // Admins get access to more sensitive data
    return Meteor.users.find({}, {
      fields: { emails: 1, roles: 1, profile: 1 }
    });
  } else {
    // Regular users get access to less sensitive data
    return Meteor.users.find({_id: this.userId}, {
      fields: { emails: 1, profile: 1 }
    });
  }
});
