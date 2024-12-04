import { useState } from 'react';
import * as spotsActions from '../../store/spots';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './ReviewFormModal.css'
import { useParams } from 'react-router-dom';

function ReviewFormModal({spotId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [review, setReview] = useState();
  const [stars, setStars] = useState();
  const [errors, setErrors] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(spotsActions.post(spotId, { review, stars }),
    setReview(''),
    setStars('')
    )
   .then(closeModal)
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });
  };
  
  
  return (
    <div className='login-container' style={{marginBottom: '5%'}}>
      <h1 className='login-text' style={{fontFamily: 'Sour Gummy'}}>How was your stay?</h1>
      <form onSubmit={handleSubmit} className='login-form'>
        <div className='submitReviewContainer'>
        <textarea 
        name="review" 
        id="submitReview"
        placeholder='Just a quick review'
        onChange={(e) => setReview(e.target.value)}
        ></textarea>
        </div>
        <div className='star-container'>
            <ul class="rate-area">
                <input type="radio" id="5-star" name="crating" value="5" onClick={(e) => setStars(parseInt(e.target.value))}/>
                    <label for="5-star" title="Amazing">5 stars</label>
                                    <input type="radio" id="4-star" name="crating" value="4" onClick={(e) => setStars(parseInt(e.target.value))}/>
                    <label for="4-star" title="Good">4 stars</label>
                                    <input type="radio" id="3-star" name="crating" value="3" onClick={(e) => setStars(parseInt(e.target.value))}/>
                    <label for="3-star" title="Average">3 stars</label>
                                    <input type="radio" id="2-star" name="crating" value="2" onClick={(e) => setStars(parseInt(e.target.value))}/>
                    <label for="2-star" title="Not Good">2 stars</label>
                                    <input type="radio" id="1-star" required=""
                    name="crating" value="1" aria-required="true" onClick={(e) => setStars(parseInt(e.target.value))}/>
                    <label for="1-star" title="Bad">1 star</label>
                    </ul> &nbsp; stars</div>
        <div className='review-button-div'>
        <button 
        className='submit-review'
        type='submit'
        > Submit Your Review </button>
        </div> 
      </form>
    </div>
  );
}

export default ReviewFormModal;