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
    const review = await Review.findByPk(reviewId)

    if(req.user.id != review.userId) {
        return res.status(401).json({
          message: "Authentication required"
        })
      }

    if(!review) { res.status(404).json({
          message:"Review couldn't be found"
      })
    }

    if(review.reviewImageCounter >= 10) {
        return res.status(403).json({
            message: "Maximum number of images for this resource was reached"
        })
    }

    
    
    await Review.increment('reviewImageCounter', {
        by: 1,
        where: {
        id: reviewId
        }
    })

   
        
    const newImg = await ReviewImage.create({url, reviewId: id});


    const response = {
    id: newImg.id,
    url: newImg.url,
};
   
    return res.status(201).json(response)
 
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
    if(req.user.id != theReviewed.userId) {
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
    }
    
     await Review.update({review, stars},
        {
        where: {
            id: id
        }
    })
    
    const reviewed = await Review.findOne({
        where: {
            id: reviewId
        },
        attributes: {
            exclude: ['reviewImageCounter']
        }
    })

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

    if(req.user.id != review.userId) {
        return res.status(401).json({
          message: "Authentication required"
        })
      }

    if(req.user.id != review.userId) {
        return res.status(401).json({
          message: "Authentication required"
        })
      }


    await Review.destroy({
        where: {
            id: reviewId
        }
    })

    res.json({
        message: "Successfully deleted"
    })
});

router.delete('/:reviewId/reviewImages/:imageId', async (req, res) => {
    const imageId = req.params.imageId;
    const reviewImage = await ReviewImage.findByPk(imageId)
    const review = await Review.findByPk(reviewImage.reviewId);
    

    if(!reviewImage) {
       return res.status(404).json({
            message: "Review Image couldn't be found"
        })
    };

    if(req.user.id != review.userId) {
        return res.status(401).json({
          message: "Authentication required"
        })
      }

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