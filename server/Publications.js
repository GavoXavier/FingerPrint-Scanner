import { Meteor } from 'meteor/meteor';
import { Sessions } from '../imports/api/Sessions';
import { Bookings } from '../imports/api/Bookings';
import { Coaches } from '../imports/api/Coaches';
import { Rooms } from '../imports/api/Rooms';

// Publish all sessions or sessions on a specific date
Meteor.publish('sessions', function (date) {
  if (date) {
    return Sessions.find({ date });
  }
  return Sessions.find();
});

// Publish all bookings
Meteor.publish('bookings', function () {
  return Bookings.find();
});

// Publish user-specific bookings
Meteor.publish('userBookings', function () {
  if (!this.userId) {
    return this.ready();
  }
  return Bookings.find({ userId: this.userId });
});

// Publish all coaches
Meteor.publish('coaches', function () {
  return Coaches.find();
});

// Publish all rooms
Meteor.publish('rooms', function () {
  return Rooms.find();
});

// Publish pending unbooking requests for admin
Meteor.publish('unbookingRequests', function () {
  if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
    return this.ready();
  }
  return Bookings.find({ status: 'Pending Unbooking' });
});
