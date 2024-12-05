import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className='signup-container'>
      <h1 className='signup-text'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='signup-form'>
      {errors.email && <p style={{color:'red', fontFamily:'Sour Gummy', marginLeft:'3%', marginTop: '-4%'}}>{errors.email}</p>}
      {errors.username && <p style={{color:'red', fontFamily:'Sour Gummy', marginLeft:'3%', marginTop: '-4%'}}>{errors.username}</p>}
      {errors.firstName && <p style={{color:'red', fontFamily:'Sour Gummy', marginLeft:'3%', marginTop: '-4%'}}>{errors.firstName}</p>}
      {errors.lastName && <p style={{color:'red', fontFamily:'Sour Gummy', marginLeft:'3%', marginTop: '-4%'}}>{errors.lastName}</p>}
      {errors.password && <p style={{color:'red', fontFamily:'Sour Gummy', marginLeft:'3%', marginTop: '-4%'}}>{errors.password}</p>}
      {errors.confirmPassword && <p style={{color:'red', fontFamily:'Sour Gummy', marginLeft:'3%', marginTop: '-4%'}}>{errors.confirmPassword}</p>}
        <label>
          <input
            type="text"
            value={email}
            placeholder='Email'
            className='signup-input'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="text"
            value={username}
            placeholder='Username'
            className='signup-input'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="text"
            value={firstName}
            placeholder='First Name'
            className='signup-input'
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
         <input
            type="text"
            value={lastName}
            placeholder='Last Name'
            className='signup-input'
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            placeholder='Password'
            className='signup-input'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            value={confirmPassword}
            placeholder='Confirm Password'
            className='signup-input'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <div className='signup-button-container'>
        <button 
        type="submit"
        className='signup-button'
        disabled={firstName.length === 0 || lastName.length === 0 || password.length === 0 || confirmPassword.length === 0 || username.length < 4 || password.length < 6}
        >Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;