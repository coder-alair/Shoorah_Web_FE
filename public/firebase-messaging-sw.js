importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

self.addEventListener('notificationclick', function (event) {
  const url = event?.notification?.data?.FCM_MSG?.notification.click_action;
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        // If so, just focus it.
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url || '/notification');
      }
    }),
  );
});

const firebaseConfig = {
  apiKey: 'AIzaSyBI9fC906yi7MSEhphNEQ1WJPAYj6tTla0',
  authDomain: 'shoorah-e87b6.firebaseapp.com',
  projectId: 'shoorah-e87b6',
  storageBucket: 'shoorah-e87b6.appspot.com',
  messagingSenderId: '607043867419',
  appId: '1:607043867419:web:5bbeef97a40148a22cb9be',
  measurementId: 'G-RQT2HBCS5E',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
