const express = require('express');
var cors = require('cors');

const keys = require('./config/keys');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const categoriesRouter = require('./routes/categories');
const authorsRouter = require('./routes/authors');
const homeRouter = require('./routes/home');

require('./config/db');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

// routes
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);
app.use('/categories', categoriesRouter);
app.use('/', homeRouter);

// app.get('/', (req, res) =>
//   res.send('<h1>Welcome To Good Reads Amazing App</h1>')
// );

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
