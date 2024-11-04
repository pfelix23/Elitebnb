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
    validateSignup,
    async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, username, firstName, lastName, hashedPassword });
  
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };
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
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
  );

  router.get('/:userId', async (req, res) => {
    let userId = req.params.userId
    const user =await User.findByPk(userId)
    if(!user) {
      return res.json({
        user: null
      })
    };

    res.json(user)
  });


  router.get('/:userId/spots', async (req, res) => {
    const ownerId = req.params.userId
    const spots = await Spot.findAll({
      where: {
        ownerId: ownerId
      }
    })
    res.json({
      Spots: spots
    })
  });

  router.get('/:userId/reviews', async (req,res) => {
    const userId = req.params.userId;

    const reviews = await Review.findAll({
      where: {
        userId: userId
      },
      include: [{
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
    {   model: Spot,
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImg' ]
    }, {
        model: ReviewImage,
        attributes: ['id', 'url']
    }]
    })
    res.json(reviews)
  })

router.get('/:userId/bookings', async (req, res) => {
  const userId = req.params.userId;
  const bookings = await Booking.findAll({
    where: {
      userId
    },
    include: [{
      model: Spot
    }]
  });

  res.json(bookings)
})
module.exports = router;