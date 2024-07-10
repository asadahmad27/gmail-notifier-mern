import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAbbS3dtOl6V9gt2GA1OFnRZLEGl9dWBUw",
  authDomain: "gcp-pub-sub-notifier.firebaseapp.com",
  databaseURL: "https://gcp-pub-sub-notifier-default-rtdb.firebaseio.com",
  projectId: "gcp-pub-sub-notifier",
  storageBucket: "gcp-pub-sub-notifier.appspot.com",
  messagingSenderId: "226341879966",
  appId: "1:226341879966:web:6b3795534c14280d8f7b8f",
  measurementId: "G-L654T5GNC0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const realtimeDb = getDatabase(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "consent",
  access_type: "offline",
});

const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      // Handle result.user here
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.idToken;
      // The signed-in user info.
      // const user = result.user;
      console.log(credential, result);
      return { credential, user: result };
      // return result.user;
    })
    .catch((error) => {
      console.error(error);
    });
};

const logOut = () => {
  return signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      console.error(error);
    });
};

export { auth, db, realtimeDb, signInWithGoogle, logOut, ref, onValue };
