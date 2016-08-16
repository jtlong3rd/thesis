const { createUser, deleteUser, findUser } = require('../controllers/userController');
const { getMessage, addMessage } = require('../controllers/messageController');
const { createEvent, getEvent, getEvents } = require ('../controllers/eventController');
const jwt = require('express-jwt');
const secrets = require('./secrets');

let jwtAuth = jwt({secret: new Buffer(secrets.jwtSecret || process.env.AUTH0_SECRET, 'base64')})

module.exports = function routes(app, express) {
  app.route('/message')
    .get(getMessage)
    .post(addMessage);

  app.post('/user', jwtAuth,
    (req, res) => {
      createUser(req.user.sub, req.body.picture, req.body.email, req.body.name)
        .then( user => res.status(200).send(user));
  });

  app.post('/userinfo', jwtAuth,
    (req, res) => {
      findUser(req.user.sub)
        .then(user => {
          res.status(200).json(user[0]);
        })
        .catch(err => console.log(error));
    });

  app.post('/event', jwtAuth,
    (req, res) => {
      createEvent(req.body, req.user.sub)
        .then(event => res.status(200).send(event))
        .catch(error => console.log(error));
  });

  app.post('/findevent', jwtAuth,
    (req, res) => {
      getEvent(req.body)
        .then(event =>{
          res.status(200).json(event)
        })
        .catch(error => console.log(error));
  })

  app.post('/events', jwtAuth,
    (req, res) => {
      getEvents(req.user.sub)
        .then(events => {
          res.status(200).json(events)
        })
        .catch(error => console.log(error));
  });

  app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: __dirname + '/../client/build/' });
  });
};
