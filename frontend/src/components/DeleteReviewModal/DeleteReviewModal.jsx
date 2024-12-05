import { useState } from 'react';
import * as reviewActions from '../../store/reviews';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteReviewModal.css'


function DeleteReviewModal({reviewId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(reviewActions.delete_review(reviewId),
    )
   .then(closeModal)
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
        console.log(errors);
      }
    });
  };
  
  
  return (
    <div className='delete-review-container' style={{marginBottom: '5%'}}>
      <h1 className='delete-review-text' style={{fontFamily: 'Sour Gummy'}}>Confirm Delete</h1>
      <h3 className='confirm-review-text' style={{fontFamily:'Sour Gummy'}}>Are you sure you want to delete this review?</h3>
      <form onSubmit={handleSubmit} className='delete-review-form'>
        <div className='delete-review-button-container'>
        <button 
        className='delete-review-button'
        type='submit'
        > Yes (Delete Review)</button>
        </div>
        
        <div className='delete-review-button-div'>
        <button 
        className='keep-review-button'
        type='button'
        onClick={() => closeModal()}
        > No (Keep Review) </button>
        </div> 
      </form>
    </div>
  );
}

export default DeleteReviewModal;