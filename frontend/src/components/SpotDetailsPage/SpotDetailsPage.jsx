import { ImStarFull } from "react-icons/im";
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { LuDot } from "react-icons/lu";
import '../Spots/Spots.css'
import { useModal } from "../../context/Modal";
import ReviewFormModal from "../ReviewFormModal/ReviewFormModal";
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
import { csrfFetch } from "../../store/csrf";


function SpotDetails() {
    const [spot, setSpot] = useState({});     
    const [errors, setErrors] = useState(null);   
    const [reviews, setReviews] = useState(null)
    const {spotId} = useParams() 
    const { setModalContent, closeModal } = useModal();
    const spotImages = []

    const sessionUser = useSelector((state) => state.session.user);

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      const openDeleteForm = (reviewId) => {
        setModalContent(<DeleteReviewModal reviewId={reviewId} closeModal={closeModal} />);
      };

    useEffect(() => {
      csrfFetch(`/api/spots/${spotId}/reviews`)
          .then((res) => {
           return res.json();
          }).then((data) => {
            setReviews(data)
          }).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              setErrors(data.errors);
              console.log(errors)
            }
          })}, [closeModal, errors, spotId])
         

    useEffect(() => {
      const fetchSpot =  csrfFetch(`/api/spots/${spotId}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
           setSpot(data.spot);  
            
          })
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              setErrors(data.errors);
              console.log(errors)
            }
          }); fetchSpot
      }, [spotId, errors, closeModal]);

      if(spot.image)spotImages.push(spot.image)
      if(spot.image1)spotImages.push(spot.image1)
      if(spot.image2)spotImages.push(spot.image2)
      if(spot.image3)spotImages.push(spot.image3)

      const userHasReviewed = reviews?.find((review) => review.userId === sessionUser?.id);

      const openReviewForm = () => {
        setModalContent(<ReviewFormModal spotId={spotId} closeModal={closeModal} />);
      };
      

            
return (
        <div className="root-details">
          <div style={{marginLeft:'6%'}}>
          <h1 style={{fontFamily:'Roboto', marginLeft:'-1%'}}>{spot.name}</h1>
          <h3 style={{fontFamily:'Roboto', marginLeft:'-1%'}}>{spot.city}, {spot.state}, {spot.country}</h3>
          </div>
          <section className="picture-section2">
            <div className="spot-card2">
              
                <picture className="first-image">
                  <img
                    className="spot-mainPic spot-addPics"
                    src={spot.previewImage}
                    alt={spot.name}
                    title={spot.name}
                  />
                </picture>
              
              
                <div className="image-grid">
                  {spotImages.map((spotImage, index) => (
                    <picture
                      className="spot-section2"
                      key={index}
                    >
                      <img
                        className="spot-addPics2 smaller-image"
                        src={spotImage}
                        alt={spot.name}
                        title={spot.name}
                      />
                    </picture>
                  ))}
                </div>
              
            </div>
          </section>
          <div className="info-box"><h2>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h2><div className="spot-info"><h2>${spot.price} night</h2> <h3 style={{marginTop:'7.5%'}}><ImStarFull />&nbsp;{spot.avgRating || "New"}{spot.numReviews && spot.numReviews > 0 ? <span><LuDot />{spot.numReviews === 1 ? "1 review" : `${spot.numReviews} reviews`}</span>: ""} </h3> </div></div>
          <div className="button-box"><p style={{fontFamily:'Roboto', fontWeight:'bold'}}>{spot.description}</p><div className="box-of-button"><button className="reserve" onClick={() => alert("Feature Coming Soon")}>Reserve</button></div></div>
          
          <div>
          <h2 className="review-head"><ImStarFull />&nbsp;{spot.avgRating || "New"}{spot.numReviews && spot.numReviews > 0 ? <span><LuDot />{spot.numReviews === 1 ? "1 review" : `${spot.numReviews} reviews`}</span>: ""} </h2>
            {sessionUser && sessionUser.id !== spot.ownerId && !userHasReviewed && (<button className="review-button" onClick={openReviewForm} >Post Your Review</button>)}
            
        {reviews && reviews.length > 0 ? (
          [...reviews].reverse().map((review) => (
            <section className="review-section" key={review.id}>
              {review.User && (<h3 className="review-user"> {review.User.firstName}</h3>)}
              {review.createdAt && (<h3>{monthNames[(review.createdAt.split('-')[1])-1]} {review.createdAt.split('-')[0]}</h3>)}
              {review.review && (<p className="review-text">{review.review}</p>)}
              {sessionUser && review.userId === sessionUser?.id && (<button className="detail-delete-button" onClick={() => openDeleteForm(review.id)}>Delete</button>)}
            </section>
          ))
        ) : (
          <h2 style={{marginLeft: '5%', fontFamily: 'Roboto'}}>Be the first to post a review!</h2>
        )}
      </div>
        </div>
      );
    }
    
    

  export default SpotDetails