import { useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore/lite";
import { nanoid } from "nanoid";

export const useFirestoreUrls = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState({
    getUrls: false,
    addUrl: false,
  });

  const getUrls = async () => {
    console.log(auth);
    try {
      setLoading((prev) => ({ ...prev, getUrls: true }));
      const dataRef = collection(db, "urls");
      const q = query(dataRef, where("uid", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const dataDB = querySnapshot.docs.map((doc) => doc.data());
      setData(dataDB);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, getUrls: false }));
    }
  };

  const addUrl = async (url) => {
    try {
      setLoading((prev) => ({ ...prev, addUrl: true }));
      const newDoc = {
        enable: true,
        nanoid: nanoid(6),
        origin: url,
        uid: auth.currentUser.uid,
      };
      const docRef = doc(db, "urls", newDoc.nanoid);
      await setDoc(docRef, newDoc);
      setData([...data, newDoc]);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, addUrl: false }));
    }
  };

  const deleteUrl = async (nanoid) => {
    try {
      setLoading((prev) => ({ ...prev, [nanoid]: true }));
      const docRef = doc(db, "urls", nanoid);
      await deleteDoc(docRef);
      setData(data.filter((item) => item.nanoid !== nanoid));
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, [nanoid]: false }));
    }
  };

  const updateUrl = async (nanoid, newUrl) => {
    try {
      setLoading((prev) => ({ ...prev, updateUrl: true }));
      const docRef = doc(db, "urls", nanoid);
      await updateDoc(docRef, { origin: newUrl });
      setData(
        data.map((item) =>
          item.nanoid === nanoid ? { ...item, origin: newUrl } : item
        )
      );
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, updateUrl: false }));
    }
  };

  const searchData = async (nanoid) => {
    try {
      const docRef = doc(db, "urls", nanoid);
      const docSnap = await getDoc(docRef);
      return docSnap;
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    data,
    error,
    loading,
    getUrls,
    addUrl,
    deleteUrl,
    updateUrl,
    searchData,
  };
};
