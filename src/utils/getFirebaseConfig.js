const getFirebaseConfig = () => {
  return {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "whereiswaldo-71bd6.firebaseapp.com",
    projectId: "whereiswaldo-71bd6",
    storageBucket: "whereiswaldo-71bd6.appspot.com",
    messagingSenderId: "1011134106648",
    appId: "1:1011134106648:web:ef75afa422817c3af6476d",
    measurementId: "G-BZC790CGVK",
  };
};

export default getFirebaseConfig;
