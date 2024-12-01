import './Spots.css'
import { IoStarSharp } from "react-icons/io5";
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Spots() {
    const [spots, setSpots] = useState([]);   
    const [error, setError] = useState(null);  
    const navigate = useNavigate()    
    
    useEffect(() => {
      fetch('http://localhost:8000/api/spots')  // Replace with your API URL
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => {
          setSpots(data.Spots); 
        })
        .catch((error) => {
          console.error('Error fetching spot:', error);
          setError(error);  
        });
    }, []);  

    if (error) {
      return <div>Error: {error.message}</div>;
    }
  

    return (
      <div>
        <section className='picture-section'>
          <div className="spot-card">
            {spots.map((spot)=> {
               return( <picture onClick={() => navigate(`/${spot.id}`)} className='spot-section' key={spot.id}>
                    <img className='Spots' src={`http://localhost:8000/public${spot.previewImage}`}
                    alt={spot.name}
                    title={spot.name} />
                    <div className='spot-details'><div className='spot-address'>{spot.city}, {spot.state}</div><div><IoStarSharp/>{spot.avgRating ? spot.avgRating: "New"}</div></div>
                    <div className='spot-price'>${spot.price} night</div>
                </picture>
                )
            })}
          </div>
        </section>
      </div>
    );
  }

  export default Spots