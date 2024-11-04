const express = require('express');
const { Spot } = require('../../db/models');
const { ReviewImage } = require('../../db/models');
const { User } = require('../../db/models');
const { Review } = require('../../db/models');
const router = express.Router();

router.post('/:reviewId/addImg', async (req, res) => {
    const {url} = req.body;
    const {reviewId} = req.params;
    const id = parseInt(reviewId);
    const numOfReviewImg = await ReviewImage.findAll({
        where: {
            reviewId: id
        }
    })

    if(numOfReviewImg >= 10) {
        return res.status(403).json({
            message: "Maximum number of images for this resource was reached"
        })
    }

    if(await Review.findByPk(reviewId)) {
        
    const newImg = await ReviewImage.create({url, reviewId: id});

    const response = {
    id: newImg.id,
    url: newImg.url,
};

    res.json(response)
} else {
        res.status(404).json({
            message:"Review couldn't be found"
        })
    }
});

router.put('/:reviewId/edit', async (req, res) => {
    const reviewId = req.params.reviewId;
    const {review, stars} = req.body
    const id = parseInt(reviewId);
    const theReviewed = await Review.findByPk(id)

    if(!theReviewed) {
       return res.status(404).json({
        message: "Review couldn't be found"
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
    }
    
     await Review.update({review, stars},
        {
        where: {
            id: id
        }
    })
    
    const reviewed = {
        id: theReviewed.id,
        userId: theReviewed.userId,
        spotId: theReviewed.spotId,
        review: review,
        stars: stars,
        createdAt: theReviewed.createdAt,
        updatedAt: theReviewed.updatedAt
    }

    res.json(reviewed);
    

});

router.delete('/:reviewId/delete', async (req, res) => {
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId)

    if(!review) {
       return res.status(404).json({
            message: "Review couldn't be found"
        })
    };

    await Review.destroy({
        where: {
            id: reviewId
        }
    })

    res.json({
        message: "Successfully deleted"
    })
});

router.delete('/:reviewId/reviewImages/:imgId', async (req, res) => {
    const imageId = req.params.imgId;
    const reviewImage = await ReviewImage.findByPk(imgId)

    if(!reviewImage) {
       return res.status(404).json({
            message: "Review Image couldn't be found"
        })
    };

    await ReviewImage.destroy({
        where: {
            id: imageId
        }
    })

    res.json({
        message: "Successfully deleted"
    })
});









module.exports = router;