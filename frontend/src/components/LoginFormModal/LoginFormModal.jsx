import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
    .then(closeModal)
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });
  };
  
  const demoUser = {
    credential: 'demo@user.com',
    password: 'password'
  };

  const handleDemoUser = (e) => {
    e.preventDefault();
    setCredential(demoUser.credential);
    setPassword(demoUser.password);
    return dispatch(sessionActions.login(demoUser))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div className='login-container'>
      <h1 className='login-text'>Log In</h1>
      <form onSubmit={handleSubmit} className='login-form'>
      {errors.credential && (
          <p style={{color: 'red', marginLeft: '17px'}}>{errors.credential}</p>
        )}
        <label>
          <input
            className='username-input'
            type="text"
            placeholder='Username or Email'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <label>
          <input
            className='password-input'
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <div className='login-button-container'>
        <button 
        className='login-button'
        type="submit"
        disabled={credential.length < 4 || password.length < 6}
        >Log In</button>
        </div>
        <br />
        <br />
        <div className='demo-user2'>
        <h3 
        className='demo-user'
        type="button"
        onClick={handleDemoUser}
        >Demo User</h3>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;