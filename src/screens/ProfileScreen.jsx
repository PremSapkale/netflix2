import React, { useContext } from 'react';
import '../styles/ProfileScreen.css';
import Nav from '../components/Nav';
import axios from 'axios';
import { Context, server } from '..';
import { toast } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

function ProfileScreen() {
   const { isAuthenticated, setIsAuthenticated, user } = useContext(Context);
   const plans = [
      {
         name: 'Premium',
         description: '4K + HDR',
         isCurrentPackage: true,
      },
      {
         name: 'Standard',
         description: '1080p',
      },
      {
         name: 'Basic',
         description: '720p',
      },
   ];

   const handleLogout = async () => {
      try {
         await axios.get(`${server}/user/logout`, {
            withCredentials: true,
         });
         toast.success('Logged Out Successfully');
         setIsAuthenticated(false);
      } catch (error) {
         toast.error(error.response.data.message);
         setIsAuthenticated(true);
      }
   };

   if (!isAuthenticated) return <Navigate to='/login' />;

   return (
      <div className='profileScreen'>
         <Nav />
         <div className='profileScreen__body'>
            <h1>Edit Profile</h1>
            <div className='profileScreen__info'>
               <img src='Netflix-avatar.png' alt='Avatar' />
               <div className='profileScreen__details'>
                  <h2>{user?.name}</h2>
                  <div className='profileScreen__plans'>
                     <div className='profileScreen__planTag'>
                        <h3>Plans</h3>
                        <span>Current Plan: Premium</span>
                     </div>
                     {plans.map((plan, index) => (
                        <div
                           key={index}
                           className={`${
                              plan.isCurrentPackage &&
                              'profileScreen__plan--disabled'
                           } profileScreen__plan`}
                        >
                           <div>
                              <h5>{plan.name}</h5>
                              <h6>{plan.description}</h6>
                           </div>
                           <button>
                              {plan.isCurrentPackage
                                 ? 'Current Package'
                                 : 'Subscribe'}
                           </button>
                        </div>
                     ))}
                     <button
                        onClick={handleLogout}
                        className='profileScreen__signOut'
                     >
                        Sign Out
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProfileScreen;
