import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
   apiKey: 'AIzaSyDLVZzMFV2PViFoT3AirZnY1R0Q_xOu4Is',
   authDomain: 'netflix2-5cb3b.firebaseapp.com',
   projectId: 'netflix2-5cb3b',
   storageBucket: 'netflix2-5cb3b.appspot.com',
   messagingSenderId: '299142282616',
   appId: '1:299142282616:web:10e9587661b33eff635c8d',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore(); // We are using firestore database
const auth = firebase.auth(); // To store user authentication data

export { auth };
export default db;
