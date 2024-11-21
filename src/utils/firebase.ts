import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDEy1YnI8dXPqhKLxDuYTXon5N6z4Z2eAM",
    authDomain: "vue-project-72067.firebaseapp.com",
    projectId: "vue-project-72067",
    storageBucket: "vue-project-72067.firebasestorage.app",
    messagingSenderId: "411443132443",
    appId: "1:411443132443:web:4ee4528e7eca9fbd9420be"
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const googleProvider = new GoogleAuthProvider();

const db = getFirestore(firebase);

export { auth, googleProvider, db };