import { IoStarSharp } from "react-icons/io5";
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '../Spots/Spots.css'

function SpotDetails() {
    const [spot, setSpot] = useState({});     
    const [error, setError] = useState(null);   
    const [reviews, setReviews] = useState([])
    const {spotId} = useParams() 

    useEffect(() => {
        fetch(`http://localhost:8000/api/spots/${spotId}/reviews`)
          .then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json();
          }).then((data) => {
            setReviews(data.Reviews)
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
            console.error('Error fetching spot:', error);
            setError(error);
          });
      }, [spotId]);
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }
    
      if (!spot) {
        return <div>Loading...</div>;
      }
      console.log(reviews)
    
      return (
        <div className="root-details">
          <section className="picture-section2">
            <div className="spot-card2">
              {/* Display the first image */}
              {spot.firstImage && spot.firstImage.length > 0 && (
                <picture className="first-image">
                  <img
                    className="spot-mainPic spot-addPics"
                    src={`http://localhost:8000/public/${spot.firstImage[0].url}`}
                    alt={spot.name}
                  />
                </picture>
              )}
    
              {/* Display the second to fourth images in a grid next to the first image */}
              {spot.otherImages && spot.otherImages.length > 0 && (
                <div className="image-grid">
                  {spot.otherImages.map((spotImage, index) => (
                    <picture
                      className="spot-section2"
                      key={spotImage.id}
                    >
                      <img
                        className="spot-addPics smaller-image"
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
          <div className="info-box"><h2>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h2><div className="spot-info"><h2>${spot.price} night</h2> <h3><IoStarSharp />{spot.avgRating} {spot.numReviews} reviews</h3> </div></div>
          <div className="button-box"><p>{spot.description}</p><div className="box-of-button"><button className="reserve">Reserve</button></div></div>
          <div>{reviews.map((review)=> {
               return( <section className="review-section" key={review.id}>
                    {review.review && <p className="review-text">{review.review}</p>}
                    {review.User && <p className="review-user">Reviewed by: {review.User}</p>}
                </section>
                )
            })}</div>
        </div>
      );
    }
    
    

  export default SpotDetails