import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDi-T2E7uuoXMuwNqQKrYXrlHoTqwn-umc',
    authDomain: 'nails-appointment-app.firebaseapp.com',
    projectId: 'nails-appointment-app',
    storageBucket: 'nails-appointment-app.appspot.com',
    messagingSenderId: '44195117089',
    appId: '1:44195117089:web:858cee1a42bc7c1cb00b60',
    measurementId: 'G-4GRFLP7MVQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
