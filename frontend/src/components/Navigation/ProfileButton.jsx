import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css'


function ProfileButton({ user }) {

  const dispatch = useDispatch()
  
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

    return (
    <>
      <div>
        {user = (
          <div style={{width: '175px'}}> 
            <div ><h4 style={{marginLeft: '45px', fontFamily: 'Sour Gummy'}}>Hello, {user.firstName}</h4></div>
            <div><h4 style={{marginLeft: '25px', fontFamily: 'Sour Gummy'}}>{user.email}</h4></div>
            <div style={{borderBottom:'solid black 2px', borderTop: 'solid black 2px', height: '28px'}} ><h4 style={{ height: '24px', marginLeft: '35px', marginTop: '4px', fontFamily: 'Sour Gummy'}}>Manage Spots</h4></div>
            <div>
              <button onClick={logout} className='logout-button'>Log Out</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;