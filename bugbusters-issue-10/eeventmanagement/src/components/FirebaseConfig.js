import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyASZwIGZqDRSxZYh02zfO-8iAqiBvlP7VQ',
  authDomain: 'aws-hackath.firebaseapp.com',
  projectId: 'aws-hackath',
  storageBucket: 'aws-hackath.appspot.com',
  messagingSenderId: '1092627573018',
  appId: '1:1092627573018:web:4746a96e78b8b22f1c24a3',
  measurementId: "G-KD6B5YNYG2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };