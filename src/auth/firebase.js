import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwd5vrMd1eTpkf8VYxDDHXUU7hBLOmC78",
  authDomain: "dsfdfas-55894.firebaseapp.com",
  projectId: "dsfdfas-55894",
  storageBucket: "dsfdfas-55894.appspot.com",
  messagingSenderId: "433660270978",
  appId: "1:433660270978:web:f405452321144244fd579b",
  measurementId: "G-6GVM33CXCD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: name,
      authProvider: "local",
      email,
      favourites: []
    });
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const loginWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const logout = () => {
  auth.signOut();
};

const addFavourite = async (country) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const userRef = doc(db, "users", user.uid);
  await updateDoc(userRef, {
    favourites: arrayUnion(country)
  });
};

const getFavourites = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const userRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userRef);
  
  return userDoc.exists() ? userDoc.data().favourites : [];
};

export { app, auth, db, registerWithEmailAndPassword, loginWithEmailAndPassword, logout, addFavourite, getFavourites };
