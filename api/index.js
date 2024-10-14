const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const { setup_db } = require('./db');
const login_routes = require('./AuthController')

const app = express();
const port = process.argv[3];

const api = require('./api');

app.use(bodyParser.json());

app.use(session({
  secret : 'cihbduweiut',
  resave : false,
  saveUninitialized : false,
}));

app.use('/api', login_routes);

// middleware to test if authenticated
function isAuthenticated (req, res, next) {
  if (req.session.user) next()
  else next('route')
}

app.use('/api', api);

app.use((req, res) => {
  res.status(404).json({error: "Not found"});
});

app.listen(port, async () => {
  await setup_db();
  console.log(`App running at: http://localhost:${port}`);
});
