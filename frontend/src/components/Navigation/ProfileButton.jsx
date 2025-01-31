import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';


function ProfileButton({ user }) {

  const navigate = useNavigate()

  const dispatch = useDispatch()
  
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate('/')
  };

    return (
    <>
      <div>
        {user = (
          <div style={{width: 'fit-content'}}> 
            <div ><h4 style={{display:'flex', justifyContent:'center', alignItems: 'center', fontFamily: 'Sour Gummy', marginBottom: '-8%'}}>Hello, {user.firstName}</h4></div>
            <div><h4 style={{ fontFamily: 'Sour Gummy', display:'flex', justifyContent:'center', alignItems: 'center'}}>{user.email}</h4></div>
            <div style={{borderTop: 'solid black 2px', marginBottom: '-8%'}} ><h4 className='manage-spots' onClick={() => navigate('/spots/:spotId/current')} >Manage Spots</h4></div>
            <div style={{borderBottom:'solid black 2px'}} ><h4 className='manage-spots' onClick={() => navigate('/reviews/current')} >Manage Reviews</h4></div>
            <div className='add-spots-div' style={{borderBottom:'solid black 2px'}} ><h4 className='add-spots' onClick={() => navigate('/spots/create')} >Create a New Spot</h4></div>
            <div className='logout-button-container'>
              <button onClick={logout} className='logout-button'>Log Out</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;