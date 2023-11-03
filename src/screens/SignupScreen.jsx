import React, { useContext, useState } from 'react';
import '../styles/SignupScreen.css';
import axios from 'axios';
import { Context, server } from '..';
import { toast } from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';

function SignUpScreen() {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
      useContext(Context);

   const signIn = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         const { data } = await axios.post(
            `${server}/user/new`,
            { name, email, password },
            {
               headers: {
                  'Content-Type': 'application/json',
               },
               withCredentials: true,
            }
         );

         toast.success(data.message);
         setIsAuthenticated(true);
         setLoading(false);
      } catch (error) {
         toast.error(error.response.data.message);
         setIsAuthenticated(false);
         setLoading(false);
      }
   };

   if (isAuthenticated) return <Navigate to='/' />;

   return (
      <div className='loginScreen'>
         <div className='loginScreen__background'>
            <img className='loginScreen__logo' src='Netflix-logo.svg' alt='' />
         </div>
         <Link to='/login' className='loginScreen__button link'>
            Login
         </Link>
         <div className='loginScreen__gradient'></div>
         <div className='loginScreen__body'>
            <div className='signupScreen'>
               <form>
                  <h1>Sign In</h1>
                  <input
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     type='text'
                     placeholder='Name'
                     required
                  />
                  <input
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     type='email'
                     placeholder='Email'
                     required
                  />
                  <input
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     type='password'
                     placeholder='Password'
                     required
                  />
                  <button type='submit' disabled={loading} onClick={signIn}>
                     Sign In
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default SignUpScreen;
