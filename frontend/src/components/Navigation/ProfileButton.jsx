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
          <>
            <div>Hello, {user.firstName}</div>
            <div>{user.email}</div>
            <div>
              <button onClick={logout} className='logout-button'>Log Out</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;