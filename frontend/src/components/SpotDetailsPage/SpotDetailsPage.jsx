import { ImStarFull } from "react-icons/im";
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { LuDot } from "react-icons/lu";
import '../Spots/Spots.css'
import { useModal } from "../../context/Modal";
import ReviewFormModal from "../ReviewFormModal/ReviewFormModal";

function SpotDetails() {
    const [spot, setSpot] = useState({});     
    const [error, setError] = useState(null);   
    const [reviews, setReviews] = useState(null)
    const {spotId} = useParams() 
    const { setModalContent, closeModal } = useModal();

    const sessionUser = useSelector((state) => state.session.user);

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

    useEffect(() => {
        fetch(`http://localhost:8000/api/spots/${spotId}/reviews`)
          .then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json();
          }).then((data) => {
            console.log(data)
            setReviews(data)
          })}, [spotId])
         

    useEffect(() => {
        fetch(`http://localhost:8000/api/spots/${spotId}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json();
          })
          .then((data) => {
            if (data.SpotImages) {
              const firstImage = data.SpotImages.slice(0, 1);  
              const otherImages = data.SpotImages.slice(1, 4);  
              setSpot({
                ...data,
                firstImage,  
                otherImages,  
              });
            } else {
              setSpot(data);  
            }
          })
          .catch((error) => {
            console.log('Error fetching spot:', error);
            setError(error);
          });
      }, [spotId]);
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }
    
      if (!spot) {
        return <div>Loading...</div>;
      }

      const userHasReviewed = reviews?.find((review) => review.userId === sessionUser?.id);

      const openReviewForm = () => {
        setModalContent(<ReviewFormModal spotId={spotId} closeModal={closeModal} />);
      };
    
      return (
        <div className="root-details">
          <div style={{marginLeft:'6%'}}>
          <h1>{spot.name}</h1>
          <h3>{spot.city}, {spot.state}, {spot.country}</h3>
          </div>
          <section className="picture-section2">
            <div className="spot-card2">
              {spot.firstImage && spot.firstImage.length > 0 && (
                <picture className="first-image">
                  <img
                    className="spot-mainPic spot-addPics"
                    src={`http://localhost:8000/public/${spot.firstImage[0].url}`}
                    alt={spot.name}
                  />
                </picture>
              )}
              {spot.otherImages && spot.otherImages.length > 0 && (
                <div className="image-grid">
                  {spot.otherImages.map((spotImage) => (
                    <picture
                      className="spot-section2"
                      key={spotImage.id}
                    >
                      <img
                        className="spot-addPics2 smaller-image"
                        src={`http://localhost:8000/public/${spotImage.url}`}
                        alt={spot.name}
                        title={spot.name}
                      />
                    </picture>
                  ))}
                </div>
              )}
            </div>
          </section>
          <div className="info-box"><h2>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h2><div className="spot-info"><h2>${spot.price} night</h2> <h3><ImStarFull /> {spot.avgRating}<LuDot />{spot.numReviews === 1 ? "1 review" : `${spot.numReviews} reviews`}</h3> </div></div>
          <div className="button-box"><p>{spot.description}</p><div className="box-of-button"><button className="reserve" onClick={() => alert("Feature Coming Soon")}>Reserve</button></div></div>
          
          <div>
            <h2 className="review-head"><ImStarFull  />&nbsp;{spot.avgRating}<LuDot />{spot.numReviews === 1 ? "1 review" : `${spot.numReviews} reviews`}</h2> 
            {sessionUser && sessionUser.id !== spot.id && !userHasReviewed && (<button className="review-button" onClick={openReviewForm}>Post Your Review</button>)}
            
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <section className="review-section" key={review.id}>
              {review.User && (<h3 className="review-user"> {review.User.firstName}</h3>)}
              {review.createdAt && (<h3>{monthNames[(review.createdAt.split('-')[1])-1]} {review.createdAt.split('-')[0]}</h3>)}
              {review.review && (<p className="review-text">{review.review}</p>)}
              {sessionUser && review.userId === sessionUser?.id && (<button className="delete-button">Delete</button>)}
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