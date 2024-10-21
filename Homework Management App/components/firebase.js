import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCYgEpB6-lAHH4KrF6NxjdvazOkpY1tEfw",
    authDomain: "homeworkmanagement-1190c.firebaseapp.com",
    projectId: "homeworkmanagement-1190c",
    storageBucket: "homeworkmanagement-1190c.appspot.com",
    messagingSenderId: "871803569722",
    appId: "1:871803569722:web:4c9e907f19cad644ee1703",
    measurementId: "G-V1Q516SB9M"
  };
 const app=initializeApp(firebaseConfig)
    firebase.initializeApp(firebaseConfig)
   
   const db=firebase.firestore()
   const auth=getAuth(app);
   export  {db,auth,firebaseConfig,firebase}; 