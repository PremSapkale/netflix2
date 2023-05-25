import React, { useState, useEffect } from 'react';
import '../styles/Nav.css';
import { useNavigate } from 'react-router-dom';

function Nav() {
   const [show, setShow] = useState(false);
   const navigate = useNavigate();

   const transitionNavBar = () => {
      if (window.scrollY > 50) {
         setShow(true);
      } else {
         setShow(false);
      }
   };

   useEffect(() => {
      window.addEventListener('scroll', transitionNavBar);
      return () => window.removeEventListener('scroll', transitionNavBar);
   }, []);

   return (
      <div className={`nav ${show && 'nav__black'}`}>
         <div className='nav__content'>
            <img
               onClick={() => navigate('/')}
               className='nav__logo'
               src='Netflix-logo.svg'
               alt='Netflix'
            />
            <img
               onClick={() => navigate('/profile')} // Now we can go back to the HomeScreen
               className='nav__avatar'
               src='Netflix-avatar.png'
               alt='Avatar'
            />
         </div>
      </div>
   );
}

export default Nav;
