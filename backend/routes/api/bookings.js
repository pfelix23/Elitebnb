const express = require('express');
const { User } = require('../../db/models');
const { Spot } = require('../../db/models');
const { Booking } = require('../../db/models');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

router.put('/:bookingId/edit', requireAuth, async (req, res) => {
    const bookingId = req.params.bookingId;
    const {startDate, endDate} = req.body;
    const end = new Date(endDate);
    const start = new Date(startDate);
    const currentDate = new Date();
    const booking = await Booking.findByPk(bookingId);
    if(!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found"
        })
    };
    
    if(req.user.id != booking.userId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    };
    
    if(start < currentDate) {
        return res.status(400).json({
            message: "Bad Request", 
            errors: {
            startDate: "startDate cannot be in the past",
            endDate: "endDate cannot be on or before startDate"
           }
        })
    }

    if(end < currentDate) {
        return res.status(403).json({
            message: "Past bookings can't be modified"
        })
    }
    const bookingConflict = await Booking.findOne({
        where: {
            spotId: booking.spotId,
            id: {
                [Op.ne]: bookingId
            }
        ,
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
     await Booking.update({startDate, endDate},
        {where: {
            id: bookingId
        }}
    );

    const booked = await Booking.findOne({
        where: {
            id: bookingId
        }
    })

    res.json(booked)


});

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findByPk(bookingId);
    const currentDate = new Date();
    const spot = await Spot.findByPk(booking.spotId);

    if(!booking) {
       return res.status(404).json({
            message: "Booking couldn't be found"
        })
    };

    if(req.user.id != booking.userId || req.user.id != spot.ownerId) {
        return res.status(401).json({
          message: "Forbidden"
        })
      }
    if(currentDate > booking.startDate) {
        return res.status(403).json({
            message: "Bookings that have been started can't be deleted"
        })
    }

    await Booking.destroy({
        where: {
            id: bookingId
        }
    })

    res.json({
        message: "Successfully deleted"
    })
})



module.exports = router;