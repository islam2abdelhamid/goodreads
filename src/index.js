const express = require('express');

const keys = require('./config/keys');
const usersRouter = require('./routes/users');
const userAuth = require('./middleware/userAuth');

const Category = require('./models/Category');
require('./config/db');

const app = express();

// middleware
app.use(express.json());

// routes
app.use('/users', usersRouter);

// example of using authentication

app.post('/categories', userAuth, async (req, res) => {
  const category = new Category({ name: 'new cat' });
  await category.save();
  res.send(category);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(keys.port, () =>
  console.log(
    `listening on http://${keys.host}:${keys.port} Ctrl+click to open the server`
  )
);
