const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const keys = require('../config/keys');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error('invalid email address');
      },
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      validate(value) {
        if (!validator.isAlpha(value))
          throw new Error('first name should contains only letters');
      },
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      validate(value) {
        if (!validator.isAlpha(value))
          throw new Error('last name should contains only letters');
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate(value) {
        if (value.includes('password'))
          throw new Error('password cannot contain word password');
      },
    },
    avatar: {
      type: String,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.statics.isEmailExist = async (email) => {
  const emailExists = await User.findOne({ email });
  return emailExists;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error('email is not registered');
  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) throw new Error('password does not match');

  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign(
    {
      _id: user._id.toString(),
    },
    keys.jwtKey
  );
  user.tokens = user.tokens.concat({
    token,
  });
  await user.save();

  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;

// user => [email, firstName, lastName, password, avatar, readList, toReadList, readingList, reviews, isAdmin]
