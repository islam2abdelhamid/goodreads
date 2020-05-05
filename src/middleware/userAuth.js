const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');

const userAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decode = jwt.verify(token, keys.jwtKey);
    const user = await User.findOne({ _id: decode._id, 'tokens.token': token });
    console.log(user)
    if (!user) throw new Error();
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ message: 'not authorized' });
  }
};

module.exports = userAuth;
