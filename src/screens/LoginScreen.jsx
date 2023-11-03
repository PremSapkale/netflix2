import React, { useContext, useState } from 'react';
import '../styles/LoginScreen.css';
import { Context, server } from '..';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Navigate, Link } from 'react-router-dom';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
      useContext(Context);
   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         const { data } = await axios.post(
            `${server}/user/login`,
            { email, password },
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
         <Link to='/new' className='loginScreen__button link'>
            Sign In
         </Link>
         <div className='loginScreen__gradient'></div>
         <div className='loginScreen__body'>
            <>
               <h1>Unlimited films, TV programmes and more.</h1>
               <h2>Watch anywhere. Cancel at any time.</h2>
               <h3>
                  Ready to watch? Enter your email to create or restart your
                  membership.
               </h3>
               <div className='loginScreen__input'>
                  <form>
                     <input
                        type='email'
                        placeholder='Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                     />
                     <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                     />
                     <button
                        className='loginScreen__getStarted'
                        disabled={loading}
                        onClick={handleSubmit}
                     >
                        Login
                     </button>
                  </form>
               </div>
            </>
         </div>
      </div>
   );
};

export default Login;
