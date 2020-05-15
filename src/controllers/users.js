const User = require('../models/User');
const usersValidations = require('../utils/validations/users');

exports.register = async (req, res) => {
  const { error, value } = usersValidations.validate(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  try {
    if (await User.isEmailExist(value.email))
      return res.status(400).send({ message: 'email already exists' });

    const user = await new User(value).save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  const user = req.user;
  user.tokens = user.tokens.filter((token) => req.token != token.token);
  await user.save();
  res.send();
};

exports.logoutAll = async (req, res) => {
  const user = req.user;
  user.tokens = [];
  await user.save();
  res.send();
};

exports.uploadAvatar = async (req, res) => {
  const user = req.user;
  user.avatar = '/uploads/users/images/' + req.file.filename;
  await user.save();
  res.send();
};

exports.profile = (req, res) => {
  const user = req.user;
  res.send(user);
};
