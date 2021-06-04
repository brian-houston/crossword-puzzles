import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC6kA-VYnT4MOKYI8PTlHIfmQuR6hQqVTI",
    authDomain: "crossword-17945.firebaseapp.com",
    projectId: "crossword-17945",
    storageBucket: "crossword-17945.appspot.com",
    messagingSenderId: "624653274687",
    appId: "1:624653274687:web:54c71716699861ef75728a"
};

const app = firebase.initializeApp(firebaseConfig);

export default app;