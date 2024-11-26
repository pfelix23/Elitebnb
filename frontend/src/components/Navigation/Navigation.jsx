import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import './Navigation.css';
import { PiUserFill } from "react-icons/pi";
import { CgMenu } from "react-icons/cg";


function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate()

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownVisible(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  let sessionLinks;
  if(sessionUser) {
    sessionLinks = (
     <li>
      <ProfileButton user={sessionUser} />
     </li>
    );
  } else {
    sessionLinks = (
      <>
      <li>
        <OpenModalButton
        buttonText="Log In"
        modalComponent={<LoginFormModal />}
        />
      </li>
      <li>
        <OpenModalButton
        buttonText="Sign Up"
        modalComponent={<SignupFormModal />}
        />
      </li>
      </>
    );
  }

  return (
    <div className='divvy'>
      <img onClick={() => navigate('/')} className='logo' src="/Elite-BNBStays.jpg" alt="Elitebnb"/>
      <ul className='nav-ul'>
        <li className='nav-item' ref={dropdownRef}>
          <button onClick={toggleDropdown} className="dropdown-button">
            <CgMenu className='cgmenu' />
            <PiUserFill className='faUser'/>
          
          </button>
          {dropdownVisible && (
            <ul className="dropdown-menu">
              <li>
                <NavLink to="/" className="dropdown-link">
                  Home
                </NavLink>
              </li>
              {!sessionUser && (
                <>
                  <li>
                    <OpenModalButton
                      buttonText="Log In"
                      modalComponent={<LoginFormModal />}
                    />
                  </li>
                  <li>
                    <OpenModalButton
                      buttonText="Sign Up"
                      modalComponent={<SignupFormModal />}
                    />
                  </li>
                </>
              )}
            </ul>
          )}
        </li>
        <li className='nav-buttons'>{isLoaded}</li>
      </ul>
    </div>
  );
}

export default Navigation;