import './UserSpots.css'
import { ImStarFull } from "react-icons/im";
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSpots } from '../../store/spots';

function UserSpotsPage() {  
    const [error, setError] = useState(null);  
    const navigate = useNavigate()  
    const userId = useSelector((state) => state.session.user.id)
    const spots = useSelector((state) => state.spots.spots);  
    const dispatch = useDispatch()

    useEffect(() => {
      if (userId) {
        
        dispatch(getSpots(userId))
          
      }
    }, [userId, dispatch]);
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  

    return (
      <div>
        <h2 style={{fontFamily:'Sour Gummy'}}>Manage Your Spots</h2>
        <button className="create-a-spot-manage-spots">Create a New Spot</button>
        <section className='picture-section'>
          <div className="spot-card">
            {spots.map((spot)=> {
               return( <picture onClick={() => navigate(`/spots/${spot.id}`)} className='spot-section' key={spot.id}>
                    <img className='Spots' src={`http://localhost:8000/public${spot.previewImage}`}
                    alt={spot.name}
                    title={spot.name} />
                    <div className='spot-details'><div className='spot-address'>{spot.city}, {spot.state}</div><div><ImStarFull/>{spot.avgRating ? spot.avgRating: "New"}</div></div>
                    <div className='spot-price'>${spot.price} night</div>
                    <br />
                    <div className='manage-spots-button-container'><button className="update-button-manage-spots">Update</button><button className="delete-button-manage-spots">Delete</button></div>
                </picture>
                )
            })}
          </div>
        </section>
      </div>
    );
  }

  export default UserSpotsPage