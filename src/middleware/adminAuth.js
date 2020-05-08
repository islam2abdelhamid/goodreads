const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decode = jwt.verify(token, keys.jwtKey);
    const user = await User.findById(decode._id);
    if (!user.isAdmin) throw new Error();
    next();
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

module.exports = adminAuth;
