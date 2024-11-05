const express = require('express');
const { User } = require('../../db/models');
const { Booking } = require('../../db/models');
const { Op } = require('sequelize');
const router = express.Router();

router.put('/:bookingId/edit', async (req, res) => {
    const bookingId = req.params.bookingId;
    const {startDate, endDate} = req.body;
    const end = new Date(endDate);
    const start = new Date(startDate);
    const currentDate = new Date();
    const booking = await Booking.findByPk(bookingId);
    if(start < currentDate || end <= start) {
        return res.status(400).json({
            message: "Bad Request", 
            errors: {
            startDate: "startDate cannot be in the past",
            endDate: "endDate cannot be on or before startDate"
           }
        })
    }
    if(!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found"
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
        },
        [Op.or]: [{
            startDate: {[Op.lt]: end}
        },
        {
             endDate: {[Op.gt]: start}
        }]
    })
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



    res.json(booking)


});

router.delete('/:bookingId/delete', async (req, res) => {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findByPk(bookingId);
    const currentDate = new Date();

    if(!booking) {
       return res.status(404).json({
            message: "Booking couldn't be found"
        })
    };
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