// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-1W3D4AQgjhCeOvGk_3ZdyMyTG3BJRJ0",
  authDomain: "sports-platform-f70a5.firebaseapp.com",
  projectId: "sports-platform-f70a5",
  storageBucket: "sports-platform-f70a5.firebasestorage.app",
  messagingSenderId: "190591758186",
  appId: "1:190591758186:web:b9346518a216e90b923f13"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };