import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';  // Add the missing import for storage
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage

const firebaseConfig = {
    apiKey: "AIzaSyC31qtcgL32JRSBTeXxrMP3MfoGx4Yt4Rc",
    authDomain: "josle5e.firebaseapp.com",
    databaseURL: "https://josle5e-default-rtdb.firebaseio.com",
    projectId: "josle5e",
    storageBucket: "josle5e.firebasestorage.app",
    messagingSenderId: "143574372151",
    appId: "1:143574372151:web:3c26be32fe62bcc8b6d4b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Firebase Storage
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Firebase Auth with persistence using AsyncStorage
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),  // Set persistence
});

// Export the initialized services
export { db, auth, storage };
