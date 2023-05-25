import React from 'react';
import '../styles/ProfileScreen.css';
import Nav from '../components/Nav';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';

function ProfileScreen() {
   const user = useSelector(selectUser); // Redux globals
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

   return (
      <div className='profileScreen'>
         <Nav />
         <div className='profileScreen__body'>
            <h1>Edit Profile</h1>
            <div className='profileScreen__info'>
               <img src='Netflix-avatar.png' alt='Avatar' />
               <div className='profileScreen__details'>
                  <h2>{user.email}</h2>
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
                        onClick={() => auth.signOut()}
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
