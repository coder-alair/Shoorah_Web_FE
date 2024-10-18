import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { setLocalStorageItem } from './utils/helper';
import { isSupported } from 'firebase/messaging';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBI9fC906yi7MSEhphNEQ1WJPAYj6tTla0',
  authDomain: 'shoorah-e87b6.firebaseapp.com',
  projectId: 'shoorah-e87b6',
  storageBucket: 'shoorah-e87b6.appspot.com',
  messagingSenderId: '607043867419',
  appId: '1:607043867419:web:5bbeef97a40148a22cb9be',
  measurementId: 'G-RQT2HBCS5E',
};


const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

export { auth };


let messaging = null;

let firebaseApp;
isSupported()?.then((res) => {
  if (res) {
    firebaseApp = initializeApp(firebaseConfig);
    messaging = getMessaging(firebaseApp);
  }
});

export const requestForToken = async () => {
  const hasFirebaseMessagingSupport = await isSupported();
  if (hasFirebaseMessagingSupport) {
    return await getToken(messaging, { vapidKey: process.env.REACT_APP_VAPID_KEY }).then(
      (currentToken) => {
        if (currentToken) {
          setLocalStorageItem('deviceToken', currentToken);
        }
        // else {
        //   errorToast('No registration token available. Request permission to generate one.');
        // }
      },
    );
    // .catch(() => {
    //   errorToast('An error occurred while retrieving token.');
    // });
  }
};




export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
