const mongoose = require('mongoose');
const keys = require('./keys');

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
