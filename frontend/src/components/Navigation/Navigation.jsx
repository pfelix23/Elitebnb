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
    <div className='root-div'>
      <img onClick={() => navigate('/')} className='logo' src="/Elite-BNBStays.png" alt="Elitebnb"/>
      <a className='Elmur-box' href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><img className='Elmur-Fudd' src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e4638f60-ecd7-4228-b667-e7628252709e/dh441km-784f793c-f60e-407c-92d7-fcfc4482aed7.png/v1/fit/w_750,h_1250/elmer_fudd_by_disneycrossover143_dh441km-375w-2x.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzU4MSIsInBhdGgiOiJcL2ZcL2U0NjM4ZjYwLWVjZDctNDIyOC1iNjY3LWU3NjI4MjUyNzA5ZVwvZGg0NDFrbS03ODRmNzkzYy1mNjBlLTQwN2MtOTJkNy1mY2ZjNDQ4MmFlZDcucG5nIiwid2lkdGgiOiI8PTIxNDgifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.oAm8x5mgcDOuXel2JDhCaU0s4MyM-WGStaFKuBgMucE" alt="Elmur" /></a>
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
          )} {sessionUser && (
            <div className='new-spot' onClick={() => navigate('/spots/create')}><h3>Create a New Spot</h3></div>
          )}
        </div>
        <nav className='nav-buttons2'>{isLoaded}</nav>
      </div>
    </div>
  );
}

export default Navigation;