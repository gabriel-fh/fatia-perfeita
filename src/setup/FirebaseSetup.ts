// firebaseSetup.ts
import { getApp, getApps, initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";


import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyD83f2LeSDIuVWBFUnu_jHOzshsjDkF5iI",
    authDomain: "fatia-perfeita.firebaseapp.com",
    databaseURL: "https://fatia-perfeita-default-rtdb.firebaseio.com",
    projectId: "fatia-perfeita",
    storageBucket: "fatia-perfeita.firebasestorage.app",
    messagingSenderId: "470134118547",
    appId: "1:470134118547:web:57d1e244064470e9079566",
    measurementId: "G-57F0MG0EYV"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const database = getDatabase(app);

export { database, auth };
