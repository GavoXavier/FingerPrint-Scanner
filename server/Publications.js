import { Meteor } from 'meteor/meteor';
import { Sessions } from '../imports/api/Sessions';
import { Bookings } from '../imports/api/Bookings';
import { Coaches } from '../imports/api/Coaches';
import { Rooms } from '../imports/api/Rooms';
import { Roles } from 'meteor/alanning:roles';

Meteor.publish('sessions', function () {
  return Sessions.find();
});

Meteor.publish('bookings', function () {
  return Bookings.find();
});

Meteor.publish('userBookings', function () {
  if (!this.userId) {
    return this.ready();
  }
  return Bookings.find({ userId: this.userId });
});

Meteor.publish('coaches', function () {
  return Coaches.find();
});

Meteor.publish('rooms', function () {
  return Rooms.find();
});

Meteor.publish('unbookingRequests', function () {
  if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
    return this.ready();
  }
  return Bookings.find({ status: 'Awaiting Approval for Unbooking' });
});

Meteor.publish('adminPayments', function () {
  if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
    return this.ready();
  }
  return Bookings.find({ status: 'Awaiting Confirmation' });
});

Meteor.publish('allUsers', function () {
  if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
    return this.ready();
  }

  return Meteor.users.find({}, {
    fields: {
      username: 1,
      profile: 1,
      emails: 1,
      roles: 1,
      bookings: 1,
      status: 1,
    }
  });
});
