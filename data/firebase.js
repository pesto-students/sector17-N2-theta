import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCfV6zkSVEImsvrcP1hoaOQMfkdQhNUPk8",
  authDomain: "sector17-chandigarh.firebaseapp.com",
  projectId: "sector17-chandigarh",
  storageBucket: "sector17-chandigarh.appspot.com",
  messagingSenderId: "524491768175",
  appId: "1:524491768175:web:c9fa60184eb6b76f24a89a",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
