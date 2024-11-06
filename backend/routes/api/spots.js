const express = require('express');
const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { User } = require('../../db/models');
const { Review } = require('../../db/models');
const { ReviewImage } = require('../../db/models');
const { Booking } = require('../../db/models');
const { Op } = require('sequelize');
const router = express.Router();



router.post('/create', async (req, res) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body;

    if(!req.user.id) {
        return res.status(401).json({
          message: "Authentication required"
        })
      }
    

    if(!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
       return res.status(400).json({
            message: "Bad Request", 
        errors: {
        address: "Street address is required",
        city: "City is required",
        state: "State is required",
        country: "Country is required",
        lat: "Latitude must be within -90 and 90",
        lng: "Longitude must be within -180 and 180",
        name: "Name must be less than 50 characters",
        description: "Description is required",
        price: "Price per day must be a positive number"
      }
        })
    } 
        const spot = await Spot.create({ address, city, state, country, lat, lng, name, description, price, ownerId: req.user.id });
        res.status(201).json(spot)


})


router.get('/:spotId', async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId)

    if(!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    res.json(await Spot.findOne({
      where: {
        id:spotId
      },
      attributes: {
        exclude: ['previewImage']
    },
    include: [{
        model: SpotImage,
        where: {
            spotId: spotId
        },
        attributes: ['id', 'url', 'preview']
        },{
        model: User,
        as: 'Owner',
        attributes: ['id', 'firstName', 'lastName']
    }]
      
    }))
  });

  router.post('/:spotId/addImg', async (req, res) => {
    const {url, preview} = req.body;
    const {spotId} = req.params;
    const id = parseInt(spotId);
    const spot = await Spot.findByPk(spotId)
    
    if(req.user.id != spot.ownerId) {
        return res.status(401).json({
          message: "Authentication required"
        })
      }

    if(!spot) {
        return res.status(404).json({
            message:"Spot couldn't be found"
        })
    } 

    const newImg = await SpotImage.create({url, spotId:id, preview});

    const response = {
    id: newImg.id,
    url: newImg.url,
    preview: newImg.preview,
};
    res.status(201).json(response)

  });

  router.put('/:spotId/edit', async (req, res) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    if(req.user.id != ownerId) {
        return res.status(401).json({
          message: "Authentication required"
        })
      }

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    }
    
    if(!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        return res.status(400).json({
             message: "Bad Request", 
         errors: {
         address: "Street address is required",
         city: "City is required",
         state: "State is required",
         country: "Country is required",
         lat: "Latitude must be within -90 and 90",
         lng: "Longitude must be within -180 and 180",
         name: "Name must be less than 50 characters",
         description: "Description is required",
         price: "Price per day must be a positive number"
       }
         })
     } 

     await Spot.update({address, city, state, country, lat, lng, name, description, price},
        {where: {id: spotId}}
    );

    const otherSpot = await Spot.findOne({
        where: {
            id: spotId
        },
        attributes: {
            exclude: ['numReviews', 'avgRating', 'previewImage']
        }
    })
    
    res.json(otherSpot)
  })

router.delete('/:spotId/delete', async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    if(req.user.id != ownerId) {
        return res.status(401).json({
          message: "Authentication required"
        })
      }

    if(!spot) {
       return res.status(404).json({
            message: "Spot couldn't be found"
        })
    };

    await Spot.destroy({
        where: {
            id: spotId
        }
    })

    res.json({
        message: "Successfully deleted"
    })
});

router.get('/:spotId/reviews', async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId)
    if(!spot) {
       return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }
    const review = await Review.findAll({
        where: {
            spotId: spotId
        },
        attributes: {
            exclude: ['reviewImageCounter']
        },
        include: [{
            model: User,
            attributes: ['id','firstName','lastName']},

            {model: ReviewImage,
            attributes: ['id', 'url']
        }],
            
    })

    res.json(review)
});

router.post('/:spotId/review/create', async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    const currentReview = await Review.findOne({
        where: {
            spotId: spotId,
            userId: req.user.id
        }
    });
    const {review, stars} = req.body

    if(!req.user.id) {
        return res.status(401).json({
          message: "Authentication required"
        })
      }
    if(!review || !stars) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                review: "Review text is required",
                stars: "Stars must be an integer from 1 to 5",
            }
        })
    };
    if(currentReview) {
        return res.status(500).json({
            message: "User already has a review for this spot"
        })
    }
    if(!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    };
    
       await Review.create({
        review, 
        stars, 
        userId:req.user.id, 
        spotId:spot.id,
        attributes: {
            exclude: ['reviewImageCounter']
        }
    });
    const newReview = await Review.findOne({
        where: {
            spotId: spotId,
            userId: req.user.id
        },
        attributes: {
            exclude: ['reviewImageCounter']
        }
    })



    res.status(201).json(newReview)
});

router.get('/:spotId/bookings', async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    const bookings = await Booking.findAll({
        where: {
            spotId: spotId
        }
    });
    if(!bookings) {
      return res.status(404).json({
          message: "Spot couldn't be found"
      })
    };
    if(!req.user.id) {
        return res.status(401).json({
          message: "Authentication required"
        })
      }

    if(bookings && spot.ownerId !== req.user.id) {
        return res.status(200).json(await Booking.findAll({
            where: {
                spotId: spotId
            },
            attributes: {
              exclude: ['userId', 'createdAt', 'updatedAt','id']
            }
        }))
      };

      if(bookings && spot.ownerId === req.user.id) {
        const booked = await Booking.findAll({
            where: {
              spotId
            },
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
          });
        return res.status(200).json(booked)
      }
});

router.post('/:spotId/bookings/create', async (req,res) => {
    const {startDate, endDate} = req.body;
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId)
    const id = parseInt(spotId);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const currentDate = new Date();
    if(!startDate || !endDate || currentDate > start || start >= end) {
        return res.status(400).json({
            message: "Bad Request", 
            errors: {
            startDate: "startDate cannot be in the past",
            endDate: "endDate cannot be on or before startDate"
           }
        })
    };
    if(!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    };

    if(!req.user.id) {
        return res.status(401).json({
          message: "Authentication required"
        })
      };
    const bookingConflict = await Booking.findOne({
        where: {
            spotId: spotId,
        
        [Op.or]: [
            {
            startDate: {[Op.lt]: end},
            endDate: {[Op.gt]: start},
        },  {
            startDate: {[Op.eq]: end},
            endDate: {[Op.gt]: start},
        }, 
        {
            startDate: {[Op.gte]: start},
            endDate: {[Op.lte]: end}
        }, 
        {
            startDate: {[Op.gte]: start},
            endDate: {[Op.gt]: end}
        }
        
    ]
}})
   
    if(bookingConflict) {
        return res.status(403).json({
           message: "Sorry, this spot is already booked for the specified dates",
           errors: {
           startDate: "Start date conflicts with an existing booking",
           endDate: "End date conflicts with an existing booking"
  } 
        })
    }

    const booking = await Booking.create({startDate, endDate, spotId:id, userId:req.user.id});
    
    

    res.status(201).json(booking)
});

router.delete('/:spotId/spotImages/:imageId/delete', async (req, res) => {
    const imageId = req.params.imageId;
    const image = await SpotImage.findByPk(imageId)
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId)

    if(!image) {
       return res.status(404).json({
            message: "Spot Image couldn't be found"
        })
    };

    if(req.user.id != spot.ownerId) {
        return res.status(401).json({
          message: "Authentication required"
        })
      }

    await SpotImage.destroy({
        where: {
            id: imageId
        }
    })

    res.json({
        message: "Successfully deleted"
    })
})

router.get('/', async (req, res) => {
    let {page = 1, size = 20 , minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;
    


    page = parseInt(page);
    size = parseInt(size);

    
    if(page < 1 || size > 20 || size < 1 || minPrice && minPrice < 0 || maxPrice && maxPrice < 0 || minLat && minLat < -90 || maxLat && maxLat > 90 ||minLng && minLng < -180 || maxLng && maxLng> 180){
        return res.status(400).json({
        message: "Bad Request", 
        errors: {
          page: "Page must be greater than or equal to 1",
          size: "Size must be between 1 and 20",
          maxLat: "Maximum latitude is invalid",
          minLat: "Minimum latitude is invalid",
          minLng: "Maximum longitude is invalid",
          maxLng: "Minimum longitude is invalid",
          minPrice: "Minimum price must be greater than or equal to 0",
          maxPrice: "Maximum price must be greater than or equal to 0"
        }
    })
}

    const Spots = await Spot.findAll({
        limit: size,
        offset: size * (page-1),
        attributes: {
            exclude: ['numReviews', 'createdAt', 'updatedAt']
        }
    })

    res.json({
        Spots,
        page,
        size
    })
} )

module.exports = router;