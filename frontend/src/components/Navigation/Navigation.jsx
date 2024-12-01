import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import './Navigation.css';
import { PiUserFill } from "react-icons/pi";
import { AiOutlineMenu } from "react-icons/ai";



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
    
    return () => document.removeEventListener('click', handleClickOutside);
    
  }, []);

  let sessionLinks;
  if(sessionUser) {
    sessionLinks = (
     <div>
      <ProfileButton user={sessionUser} />
     </div>
    );
   } 

  return (
    <div className='divvy'>
      <img onClick={() => navigate('/')} className='logo' src="/Elite-BNBStays.png" alt="Elitebnb"/>
      <div className='nav-ul'>
        <div className='nav-item' ref={dropdownRef}>
          <button onClick={toggleDropdown} className="dropdown-button">
            <AiOutlineMenu className='cgmenu' />
            <PiUserFill className='PiUserFill'/>
          
          </button>
          {dropdownVisible && (
            <div className="dropdown-menu">
              {!sessionUser && (
                <div >
                  <div className='dropdown-modal'>
                    <OpenModalButton
                      buttonText="Sign Up"
                      modalComponent={<SignupFormModal />}
                    />
                  </div>
                  <div className='dropdown-modal2'>
                    <OpenModalButton 
                      buttonText="Log In"
                      modalComponent={<LoginFormModal />}

                    />
                  </div>
                </div>
              )}
              {sessionUser && (
                <>
                <div className='nav-buttons'>{sessionLinks}</div>
                
                </>
              )}
            </div>
          )}
        </div>
        <nav className='nav-buttons2'>{isLoaded}</nav>
      </div>
    </div>
  );
}

export default Navigation;