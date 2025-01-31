import { useEffect, useState } from 'react';
import * as spotsActions from '../../store/spots';
import * as reviewsActions from '../../store/reviews';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './ReviewFormModal.css';

function ReviewFormModal({spotId, userHasReviewed, spot, reviewId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(null);
  const [errors, setErrors] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(spotsActions.post(spotId, { review, stars }),
    setReview(''),
    setStars(null)
    )
   .then(closeModal)
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
        console.log(errors)
      }
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(reviewsActions.update(reviewId, { review, stars }),
    setReview(''),
    setStars(null)
    )
   .then(closeModal)
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
        console.log(errors)
      }
    });
  };
  
  useEffect(() => {
    if(userHasReviewed) {
      setReview(userHasReviewed.review);
      setStars(parseInt(userHasReviewed.stars));
    }
  }, [userHasReviewed])
  
  
  return (
    <div className='review-container2' style={{marginBottom: '5%'}}>
      <h1 className='review-text-head'>How was your stay at <br /> {spot.name}?</h1>
      {errors.error && (<p style={{color:'red', fontFamily:'Sour Gummy', fontSize:'15px', fontWeight:'bold'}}>{errors.error}</p>)}
      <form onSubmit={!userHasReviewed ? handleSubmit : handleUpdate} className='review-form2'>
        <div className='submitReviewContainer'>
        <textarea 
        name="review" 
        id="submitReview"
        placeholder='Leave your review here...'
        value={review}
        onChange={(e) => setReview(e.target.value)}
        ></textarea>
        </div>
        <div className='star-container'>
            <ul className="rate-area">
                <input type="radio" id="5-star" name="crating" value="5" checked={stars === 5} onClick={(e) => setStars(parseInt(e.target.value))}/>
                    <label htmlFor="5-star" title="Amazing">5 stars</label>
                                    <input type="radio" id="4-star" name="crating" value="4" checked={stars === 4} onClick={(e) => setStars(parseInt(e.target.value))}/>
                    <label htmlFor="4-star" title="Good">4 stars</label>
                                    <input type="radio" id="3-star" name="crating" value="3" checked={stars === 3} onClick={(e) => setStars(parseInt(e.target.value))}/>
                    <label htmlFor="3-star" title="Average">3 stars</label>
                                    <input type="radio" id="2-star" name="crating" value="2" checked={stars === 2} onClick={(e) => setStars(parseInt(e.target.value))}/>
                    <label htmlFor="2-star" title="Not Good">2 stars</label>
                                    <input type="radio" id="1-star" required=""
                    name="crating" value="1" aria-required="true" checked={stars === 1} onClick={(e) => setStars(parseInt(e.target.value))}/>
                    <label htmlFor="1-star" title="Bad">1 star</label>
                    </ul> &nbsp; stars</div>
        <div className='review-button-div'>
        <button 
        className='submit-review'
        type='submit'
        disabled={review.length < 10 || stars === null}
        > {!userHasReviewed ? 'Submit' : 'Update'} Your Review </button>
        </div> 
      </form>
    </div>
  );
}

export default ReviewFormModal;