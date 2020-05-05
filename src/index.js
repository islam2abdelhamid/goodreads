const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
dotenv.config();
const keys = require('./config/keys');
const usersRouter = require('./routes/users');

// middleware
app.use(express.json());
app.use(usersRouter);

// connect to mongodb
mongoose.connect(
  `${keys.mongodbURI + '/' + keys.mongodbName}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) return console.log(err);
    return console.log('connected to mongodb successfully');
  }
);

app.get('/', (req, res) => {
  res.send('hello node');
});

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

app.listen(keys.port, () =>
  console.log(
    `listening on http://${keys.host}:${keys.port} Ctrl+Click to open the server`
  )
);
