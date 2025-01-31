import './UserReviewsPage.css'
import { useState, useEffect} from 'react';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
import ReviewFormModal from '../ReviewFormModal/ReviewFormModal';
import { useModal } from '../../context/Modal';
import { csrfFetch } from '../../store/csrf';

function UserReviewsPage() {  
    const [errors, setErrors] = useState(null);  
    const [reviews, setReviews] = useState(null);  
    const { setModalContent, closeModal } = useModal();

  useEffect(() => {
        csrfFetch(`/api/reviews/current`)
            .then((res) => {
             return res.json();
            }).then((data) => {
              setReviews(data.Reviews)
            }).catch(async (res) => {
              const data = await res.json();
              if (data && data.errors) {
                setErrors(data.errors);
                console.log(errors)
            }
        })}, [errors, closeModal])

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


  return (
      <div>
        <h2 style={{fontFamily:'Sour Gummy', marginLeft:'5%', marginBottom: '-.4%', fontWeight: '600'}}>Manage Reviews</h2>
        <section className='review-section-2'>
          <div className="review-div">
            {reviews?.map((review)=> {
                 const userHasReviewed = review

                 const openUpdateForm = () => {
                     setModalContent(<ReviewFormModal spotId={userHasReviewed.Spot.id} closeModal={closeModal} userHasReviewed={userHasReviewed} spot={userHasReviewed.Spot} reviewId={userHasReviewed.id} />);
                 };
             
                 const openDeleteForm = (reviewId) => {
                     setModalContent(<DeleteReviewModal reviewId={reviewId} closeModal={closeModal} />);
                 };
               return( <div className='review-container' key={review.id}>
                    <div className='review-name'><h4 className='spot-name-reviewed'>{review.Spot.name}</h4></div>
                    {review.createdAt && (<div className='review-month'>{monthNames[(review.createdAt.split('-')[1])-1]} {review.createdAt.split('-')[0]}</div>)}
                    <div className='review-content'>{review.review}</div>
                    <br />
                    <div className='manage-reviews-button-container'><button className="update-button-manage-reviews" onClick={openUpdateForm} >Update</button><button className="delete-button-manage-reviews" onClick={() => openDeleteForm(review.id)}>Delete</button></div>
                </div>
                )
            })}
          </div>
        </section>
      </div>
    );
  }

  export default UserReviewsPage