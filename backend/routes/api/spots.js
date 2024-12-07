const express = require('express');
const { Spot, sequelize } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { User } = require('../../db/models');
const { Review } = require('../../db/models');
const { ReviewImage } = require('../../db/models');
const { Booking } = require('../../db/models');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();



router.post('/create', requireAuth, async (req, res) => {
    const {address, city, state, country, lat, lng, name, description, price, previewImage, image, image1, image2, image3} = req.body;

    
    
    if(!address || !city || !state || !country || !lat || !lng || !name || !description || !price || name.length > 50 ||  lat < -90 || lat > 90 || lng < -180 || lng > 180 || price < 0 || !previewImage) {
        return res.status(400).json({
            message: "Bad Request", 
            errors: {
                address: "Street address is required",
        city: "City is required",
        state: "State is required",
        country: "Country is required",
        lat: "Lat is required",
        lng: "Lng is required",
        name: "Name must be less than 50 characters",
        description: "Description is required",
        price: "Price per day must be a positive number",
        previewImage: "Preview Image is required."
    }
})
} 
if(!req.user.id) {
    return res.status(403).json({
      message: "forbidden"
    })
  }

        const spot = await Spot.create({ address, city, state, country, lat, lng, name, description, price, ownerId: req.user.id, previewImage, image, image1, image2, image3 });
        res.status(201).json(spot)

        const imageUrls = [
            { url: previewImage, spotId: spot.id, preview: true },
            { url: image, spotId: spot.id, preview: false },
            { url: image1, spotId: spot.id, preview: false },
            { url: image2, spotId: spot.id, preview: false },
            { url: image3, spotId: spot.id, preview: false }
        ];
        
        
        for (const img of imageUrls) {
            if (img.url) {
                await SpotImage.create(img);
            }
        }


})


router.get('/:spotId', async (req, res) => {
    const spotId = req.params.spotId;
    const spotted = await Spot.findByPk(spotId)

    if(!spotted) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    const spot = await Spot.findOne({
      where: {
        id:spotId
      },
      include: [{
        model: User,
        as: 'Owner',
        attributes: ['id', 'firstName', 'lastName']
    },{
        model: SpotImage,
        attributes: ['url', 'preview']
    }  ]      
    })

    res.json({spot})
  });

  router.post('/:spotId/addImg', requireAuth, async (req, res) => {
    const {url, preview} = req.body;
    const {spotId} = req.params;
    const id = parseInt(spotId);
    const spot = await Spot.findByPk(spotId)
    
    if(!spot) {
        return res.status(404).json({
            message:"Spot couldn't be found"
        })
    } 
    if(req.user.id != spot.ownerId) {
        return res.status(403).json({
          message: "Forbidden"
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

  router.put('/:spotId/update', requireAuth, async (req, res) => {
    const {address, city, state, country, lat, lng, name, description, price, previewImage, image, image1, image2, image3} = req.body
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    
        if (!spot) {
            return res.status(404).json({
                message: "Spot couldn't be found"
            });
        }

    if(req.user.id != spot.ownerId) {
        return res.status(403).json({
          message: "Forbidden"
        })
      }
    
      if(!address || !city || !state || !country || !lat || !lng || !name || !description || !price || name.length > 50 ||  lat < -90 || lat > 90 || lng < -180 || lng > 180 || price < 0) {
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

     await Spot.update({address, city, state, country, lat, lng, name, description, price, previewImage, image, image1, image2, image3},
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

router.delete('/:spotId', requireAuth , async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    if(!spot) {
       return res.status(404).json({
            message: "Spot couldn't be found"
        })
    };
    if(req.user.id != spot.ownerId) {
        return res.status(403).json({
            message: "Forbidden"
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

router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    const {review, stars} = req.body
    const currentReview = await Review.findOne({
        where: {
            spotId: spotId,
            userId: req.user.id
        }
    });
    
    if(!review || !stars) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                review: "Review text is required",
                stars: "Stars must be an integer from 1 to 5",
            }
        })
    };

    if(!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    };
    
    if(currentReview) {
        return res.status(500).json({
            message: "User already has a review for this spot"
        })
    }
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

    const allReviews = await Review.findAll({
        where: { spotId: spotId },
        attributes: [[sequelize.fn('avg', sequelize.col('stars')), 'avgRating']]
    });

    
    const avgRating = allReviews[0].get('avgRating');

    const limitAvgRating = parseFloat(avgRating).toFixed(2);
    

    await Spot.increment('numReviews', {
        by: 1,
        where: {
        id: spotId
        }
    })

   
    await Spot.update(
        {
            avgRating: limitAvgRating
        },
        {
            where: { id: spotId }
        }
    );



    res.status(201).json(newReview)
});

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
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

    if(bookings && spot.ownerId != req.user.id) {
        return res.status(200).json(await Booking.findAll({
            where: {
                spotId: spotId
            },
            attributes: {
              exclude: ['userId', 'createdAt', 'updatedAt','id']
            }
        }))
      };

      if(bookings && spot.ownerId == req.user.id) {
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

router.post('/:spotId/bookings/create', requireAuth, async (req,res) => {
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

    if(req.user.id == spot.ownerId) {
        return res.status(403).json({
          message: "Forbidden"
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

router.delete('/:spotId/spotImages/:imageId', requireAuth, async (req, res) => {
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
        return res.status(403).json({
          message: "Forbidden"
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

router.get('/:spotId/spotImages/:imageId', requireAuth, async (req, res) => {
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
        return res.status(403).json({
          message: "Forbidden"
        })
      }


    return res.json({
        Image: image
    })
})

router.get('/', async (req, res) => {
    let {page , size  , minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;
    
    page = parseInt(page);
    size = parseInt(size);

    if(!page && !size) {
      const spots = await Spot.findAll({
            attributes: {
                exclude: ['numReviews']
            }
        })

        return  res.json({
            Spots: spots
        })
    }

    
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
const options = {};

if(minLat || maxLat) {
    options.lat = {}
    if(minLat) options.lat[Op.gte] = parseFloat(minLat);
    if(maxLat) options.lat[Op.lte] = parseFloat(maxLat);
}

if(minLng || maxLng) {
    options.lng = {}
    if(minLng) options.lng[Op.gte] = parseFloat(minLng);
    if(maxLng) options.lng[Op.lte] = parseFloat(maxLng);
}

if(minPrice || maxPrice) {
    options.price = {}
    if(minPrice) options.price[Op.gte] = parseFloat(minPrice);
    if(maxPrice) options.price[Op.lte] = parseFloat(maxPrice);
}

    const spots = await Spot.findAll({
        where: options,
        limit: size,
        offset: size * (page-1),
        attributes: {
            exclude: ['numReviews']
        },
        raw: true
    })

    res.json({
        Spots: spots,
        page,
        size
    })
} )

router.get('/:userId/current', requireAuth, async (req, res) => {
    const ownerId = req.user.id
    console.log(ownerId)
    
    const spots = await Spot.findAll({
      where: {
        ownerId: ownerId
      },
      attributes: {
        exclude: ['numReviews']
      },
      include: [{
        model: SpotImage,
        attributes: ['url', 'preview']
    }]    
    })
    
    res.json({
      Spots: spots
    })
  });

module.exports = router;