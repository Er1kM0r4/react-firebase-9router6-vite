import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const UserContexts = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, photoURL, displayName, uid } = user;
        setUser({ email, photoURL, displayName, uid });
      } else {
        setUser(null);
      }
      console.log(user);
    });

    return () => unsubscribe();
  }, []);

  const registerUser = (email, pass) =>
    createUserWithEmailAndPassword(auth, email, pass);

  const loginUser = (email, pass) =>
    signInWithEmailAndPassword(auth, email, pass);

  const sigOutUser = () => signOut(auth);

  return (
    <UserContexts.Provider
      value={{ user, setUser, registerUser, loginUser, sigOutUser }}
    >
      {props.children}
    </UserContexts.Provider>
  );
};
