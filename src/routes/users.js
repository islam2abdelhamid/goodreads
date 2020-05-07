const { Router } = require('express');

const imageUploader = require('../utils/imageUploader');

const userController = require('../controllers/users');
const userAuth = require('../middleware/userAuth');

const router = new Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

const upload = imageUploader('uploads/users/images');

router.post(
  '/profile/avatar',
  userAuth,
  upload.single('avatar'),
  userController.uploadAvatar,
  (error, req, res, next) => {
    return res.status(400).send({ message: error.message });
  }
);

module.exports = router;
   