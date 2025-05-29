import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './SignUp.css';

function SignIn() {
    const [email,setEmail] = useState ("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate ();
    const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("Signing in with:", { email, password });

    try { 
      const response = await axios.post('http://localhost:5000/api/users/signIn', {
        email,
        password
      });

      const { token, user } = response.data;

      // Try: Store token in localStorage or cookie
      localStorage.setItem("token", token);

      toast.success("Sign in successful!", {
        autoClose: 1000,
        onClose: () => navigate('/shop') // redirect after toast
      });

    } catch (error) {
      // If backend returns a specific message
      const errorMessage = error?.response?.data?.message || "Sign in failed";
      toast.error(errorMessage, { autoClose: 1500 });
      console.error("Sign-in error:", error);
    }
  };


    return (
    <div className='mainContainer'>
      <div className='imageContainer'></div>
      <div className='container'>
        <h1>Sign In. </h1>
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
          <button type='submit' >Sign In</button>
          <p className='pLabel'> New to anico? <Link to="/signUp" >Create an account.</Link></p>
        </form>
        <ToastContainer/>
      </div>
    </div>
  );


}

export default SignIn;