import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQ8Bil1ZpkLNEVEasxGs2acBW3zSr0HKg",
  authDomain: "react-full-ab55e.firebaseapp.com",
  projectId: "react-full-ab55e",
  storageBucket: "react-full-ab55e.firebasestorage.app",
  messagingSenderId: "206916443845",
  appId: "1:206916443845:web:6cd0b0f8d95741f025daac",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
