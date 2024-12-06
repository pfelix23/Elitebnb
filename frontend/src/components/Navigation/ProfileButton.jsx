import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css'
import { useNavigate } from 'react-router-dom';


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
            <div ><h4 style={{display:'flex', justifyContent:'center', alignItems: 'center', fontFamily: 'Sour Gummy'}}>Hello, {user.firstName}</h4></div>
            <div><h4 style={{ fontFamily: 'Sour Gummy', display:'flex', justifyContent:'center', alignItems: 'center'}}>{user.email}</h4></div>
            <div style={{borderBottom:'solid black 2px', borderTop: 'solid black 2px'}} ><h4 className='manage-spots' onClick={() => navigate('/spots/:spotId/current')} >Manage Spots</h4></div>
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