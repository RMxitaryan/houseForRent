import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCgEeuFOW43xECzcmlVRlvcPhtBkkFa4Hc",
  authDomain: "houses-for-rent-402de.firebaseapp.com",
  databaseURL: "https://houses-for-rent-402de-default-rtdb.firebaseio.com",
  projectId: "houses-for-rent-402de",
  storageBucket: "houses-for-rent-402de.appspot.com",
  messagingSenderId: "610565025451",
  appId: "1:610565025451:web:149edb299c8e765a1811ee",
};

const app = initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);

export const db = getFirestore(app);
