const express = require('express');

const keys = require('./config/keys');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');

const userAuth = require('./middleware/userAuth');

const Category = require('./models/Category');

require('./config/db');

const app = express();

// middleware
app.use(express.json());

// routes
app.use('/users', usersRouter);

app.use('/books',booksRouter)

// example of using authentication

app.post('/categories', userAuth, async (req, res) => {
  const category = new Category({ name: 'new cat' });
  await category.save();
  res.send(category);
});

app.get('/', (req, res) =>
  res.send('<h1>Welcome To Good Reads Amazing App</h1>')
);

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
