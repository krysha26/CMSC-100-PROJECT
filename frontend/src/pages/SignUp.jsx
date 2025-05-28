import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './SignUp.css';


function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();


    try{
      await axios.post('http://localhost:5000/api/users/signUp', {
      email: email,
      password: password,});
      toast.success("Sign up successful!", {
        autoClose: 1000,
        onClose: () => navigate('/shop') // Navigate to shop

      });
      
    }catch(error) {
      toast.error("Sign up failed. Please try again");
    }
  };

  
  return (
    <div className='mainContainer'>
      <div className='imageContainer'></div>
      <div className='container'>
        <h1>Sign Up. </h1>
        <form onSubmit={handleSignIn} className='form'>
          <p>Email Address:</p>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p>Password:</p>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type='submit'>Sign Up</button>
          
        </form>
        <ToastContainer/>
      </div>
    </div>
  );
}

export default SignUp; 