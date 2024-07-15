import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import bodyParser from 'body-parser';

// Middleware to parse JSON request body
WebApp.connectHandlers.use(bodyParser.json());

let currentUsername = null;

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

  currentUsername = username;
  res.writeHead(200, { 'Content-Type': 'application/json' }); // OK
  res.end(JSON.stringify({ status: 'Received', username }));
});

Meteor.methods({
  'api.checkUsername'() {
    const username = currentUsername;
    currentUsername = null; // Clear the stored username after retrieval
    return { username };
  },
});
