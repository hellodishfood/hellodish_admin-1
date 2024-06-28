import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwrO_u6JompNcJRIBjf7NBp-oKuVH2N2o",
  authDomain: "hello-dish-app.firebaseapp.com",
  projectId: "hello-dish-app",
  storageBucket: "hello-dish-app.appspot.com",
  messagingSenderId: "245282429480",
  appId: "1:245282429480:web:995a70ec1c7f731212731d",
  measurementId: "G-YTQKXCTBN6",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
