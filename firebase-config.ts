import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDyxXytQdZpnajDascKUMftD8TBLMJ7OUk",
    authDomain: "faisal-project-6da59.firebaseapp.com",
    projectId: "faisal-project-6da59",
    storageBucket: "faisal-project-6da59.firebasestorage.app",
    messagingSenderId: "545611827728",
    appId: "1:545611827728:web:6825a40296ad8715ae1895",
    measurementId: "G-4Q284Y5CMZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };