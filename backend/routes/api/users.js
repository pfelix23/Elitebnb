// backend/routes/api/users.js
const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { Spot } = require('../../db/models');
const { Review } = require('../../db/models');
const { ReviewImage } = require('../../db/models');
const { Booking } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// backend/routes/api/users.js
// ...

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
    '/', 
    async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;
      if(!email || !password || !username || !firstName || !lastName) {
        return res.status(400).json({
          message: "Bad Request",
          errors: {
          email: "Invalid email",
          username: "Username is required",
          firstName: "First Name is required",
          lastName: "Last Name is required"
         }
       })
      }
      const hashedPassword = bcrypt.hashSync(password);
      const usedEmail = await User.findOne({
        where: {
          email: email
        }
      });
      
      const usedUserName = await User.findOne({
        where: {
          username: username
        }
      })

      
      if(usedEmail || usedUserName) {
        return res.status(500).json({
          message: "User already exists",
          errors: {
            email: "User with that email already exists",
            username: "User with that username already exists"
          }        
        })
      }
      const user = await User.create({ email, username, firstName, lastName, hashedPassword });
      
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.status(201).json({
        user: safeUser
      });
    }
  );

  router.get('/:userId', async (req, res) => {
    let userId = req.params.userId
    const user =await User.findByPk(userId)
    const token = req.cookies
    if(!token) {
      return res.json({
        user: null
      })
    };

    res.json({
      user: user
    })
  });


router.get('/:userId/bookings', requireAuth, async (req, res) => {

  const bookings = await Booking.findAll({
    where: {
      userId: req.user.id
    },
    include: [{
      model: Spot,
      attributes: {exclude: ['createdAt', 'updatedAt', 'description', 'numReviews', 'avgRating']}
    }]
  });

  res.json({Bookings: bookings})
})


module.exports = router;