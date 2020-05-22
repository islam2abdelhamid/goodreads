const Joi = require('@hapi/joi');

const User = require('../../models/User');

const schema = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  passwordConfirmation: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .messages({ 'any.only': 'password does not match' }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
}).with('password', 'passwordConfirmation');

module.exports = schema;
