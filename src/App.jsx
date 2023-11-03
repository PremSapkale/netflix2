import React, { useContext, useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import ProfileScreen from './screens/ProfileScreen';
import SignUpScreen from './screens/SignupScreen';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { Context, server } from '.';

function App() {
   const userr = useSelector(selectUser);
   const dispatch = useDispatch();
   const { setUser, setIsAuthenticated } = useContext(Context);

   useEffect(() => {
      axios
         .get(`${server}/user/profile`, { withCredentials: true })
         .then((res) => {
            setUser(res.data.user);
            setIsAuthenticated(true);
         })
         .catch(() => {
            setUser({});
            setIsAuthenticated(false);
         });
   }, []);

   return (
      <div className='app'>
         <Router>
            {/* {!user ? ( */}
            <Routes>
               <Route path='/login' element={<LoginScreen />}></Route>
               <Route path='/new' element={<SignUpScreen />}></Route>
               {/* </Routes> */}
               {/* ) : ( */}
               {/* <Routes> */}
               <Route path='/profile' element={<ProfileScreen />}></Route>
               <Route path='/' element={<HomeScreen />}></Route>
            </Routes>
            {/* )} */}
            <Toaster />
         </Router>
      </div>
   );
}

export default App;
