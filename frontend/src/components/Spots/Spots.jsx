import './Spots.css'
import { ImStarFull } from "react-icons/im";
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { csrfFetch } from "../../store/csrf";


function Spots() {
    const [spots, setSpots] = useState([]);   
    const [errors, setErrors] = useState(null);  
    const navigate = useNavigate();    
    
    useEffect(() => {
      csrfFetch('/api/spots')  
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setSpots(data.Spots); 
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
            console.log(errors)
          }
        });
    }, [errors]);  

    

    return (
      <div>
        <section className='picture-section'>
          <div className="spot-card">
            {[...spots].reverse().map((spot)=> {
               return( <picture onClick={() => navigate(`/spots/${spot.id}`)} className='spot-section' key={spot.id}>
                    <img className='Spots' src={spot.previewImage}
                    alt={spot.name}
                    title={spot.name} />
                    <div className='spot-details'><div className='spot-address'>{spot.city}, {spot.state}</div><div><ImStarFull style={{fontSize:'15.5px'}}/>{spot.avgRating ? spot.avgRating: "New"}</div></div>
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