import { useState } from 'react';
import axios from 'axios';
import './SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/users/signUp', {
      email: email,
      password: password,
    });
    setMessage('Sign up successful!');
  };

  return (
    <div className='signup'>
      <div className='signup__image-section'></div>
      <div className='signup__form-section'>
        <h1 className='signup__title'>Sign Up.</h1>
        <form onSubmit={handleSignIn} className='signup__form'>
          <p>Email Address:</p>
          <input
            className='signup__form-input'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p>Password:</p>
          <input
            className='signup__form-input'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type='submit' className='signup__submit-button'>Sign Up</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default SignUp; 