import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import ProfileScreen from './screens/ProfileScreen';

function App() {
   const user = useSelector(selectUser);
   const dispatch = useDispatch();

   useEffect(() => {
      // Below onAuthStateChanged() is listner to login state of an user stored in localStorage
      const unsubscribe = auth.onAuthStateChanged((userAuth) => {
         if (userAuth) {
            // Logged in
            dispatch(
               login({
                  uid: userAuth.uid,
                  email: userAuth.email,
               })
            );
         } else {
            // Logged out
            dispatch(logout());
         }
      });

      // Cleanup
      return unsubscribe;
   }, [dispatch]);

   return (
      <div className='app'>
         <Router>
            {!user ? (
               <LoginScreen />
            ) : (
               <Routes>
                  <Route path='/profile' element={<ProfileScreen />}></Route>
                  <Route path='/' element={<HomeScreen />}></Route>
               </Routes>
            )}
         </Router>
      </div>
   );
}

export default App;
