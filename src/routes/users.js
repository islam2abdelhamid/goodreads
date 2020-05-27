const { Router } = require('express');

const imageUploader = require('../utils/imageUploader');

const userController = require('../controllers/users');
const userAuth = require('../middleware/userAuth');
const User = require('../models/User');

const router = new Router();

router.get('/profile', userAuth, userController.profile);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userAuth, userController.logout);
router.post('/logout_all', userAuth, userController.logoutAll);

const upload = imageUploader('public/uploads/users/images');

router.post(
  '/profile/avatar',
  userAuth,
  upload.single('avatar'),
  userController.uploadAvatar,
  (error, req, res, next) => {
    return res.status(400).send({ message: error.message });
  }
);


router.post('/:id', userAuth, async (req, res, next) => {
    user = req.user;
    if(user.isAdmin == true)
    {
      try {

        const user = await User.findById(req.params.id)
        
        if (!user) {
          return res.status(400).send({ message: 'User Not Found' });
        }
        user.isAdmin = true;
        user.save();
        return res.status(200).json(user);
      } catch (error) {
        next(error);
      }
    }
    else
    {
      return res.status(400).send({ message: 'Not Allowed For You' });

    }
  
  
});

module.exports = router;
