import { useState } from 'react';
import * as spotsActions from '../../store/spots';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteSpotModal.css'


function DeleteSpotModal({spotId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(spotsActions.deleteSpot(spotId),
    )
   .then(() => {
   
   dispatch(spotsActions.getSpots(userId)); 
   closeModal()
  })
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });
  };
  
  
  return (
    <div className='delete-container' style={{marginBottom: '5%'}}>
      <h1 className='delete-text' style={{fontFamily: 'Sour Gummy'}}>Confirm Delete</h1>
      <h3 className='confirm-text' style={{fontFamily:'Sour Gummy'}}>Are you sure you want to remove this spot from the listings?</h3>
      <form onSubmit={handleSubmit} className='delete-form'>
        <div className='delete-button-container'>
        <button 
        className='delete-button'
        type='submit'
        > Yes (Delete Spot)</button>
        </div>
        
        <div className='delete-button-div'>
        <button 
        className='keep-button'
        type='button'
        onClick={() => closeModal()}
        > No (Keep Spot) </button>
        </div> 
      </form>
    </div>
  );
}

export default DeleteSpotModal;