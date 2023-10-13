import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider
} from "firebase/auth";
import { uploadBytes, ref, getDownloadURL, deleteObject } from "firebase/storage";
import { addDoc, collection, query, where, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { auth, storage, db } from "../firebase";

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export default  function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [shop, setShop] = useState(null)
  const [loading, setLoading] = useState(true);
  const [usernameAvailable, setUsernameAvailable] = useState(true)

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => signOut(auth);

  const resetPassword = async (email) => sendPasswordResetEmail(auth, email);

  const checkIfUsernameIsAvailable = async (username)=> {
    if (username.length >= 3 && username.length <= 15) {
      const q = query(collection(db, "usernames"), where( "username", "==", username))     
      const data = await getDocs(q)
      setUsernameAvailable(data.empty)
  } 
  }

  const updateUser = async (image, displayName, username) =>{
  try {

    let photoURL = null;

    if(image){
      const storageRef = ref(storage, auth.currentUser.uid)
      await uploadBytes(storageRef, image) 
      photoURL = await getDownloadURL(storageRef)
      await updateProfile(auth.currentUser, {displayName, photoURL })
    }
    else{
      await updateProfile(auth.currentUser, {displayName})
    }

    if (usernameAvailable){
      const q = query(collection(db, "usernames"), where( "user", "==", auth.currentUser.uid))     
      const data = await getDocs(q)    
      
      if(data.empty){
        await addDoc(collection(db, "usernames"), {user: auth.currentUser.uid, username, email: auth.currentUser.email, displayName, photoURL, paid: null, paymentMethod: null});    
      } 
      else{
        data.forEach(async (docRef)=>{
          await updateDoc(doc(db, "usernames", docRef.id), {displayName, username, photoURL})
        })
      }
     }
  } catch (error) {
    console.log(error)
  }
  }

 


  const deleteShop = async (credentials) => {


    const AuthUser = auth.currentUser

    const credential = EmailAuthProvider.credential(credentials.email, credentials.password);

    reauthenticateWithCredential(AuthUser, credential).then(async () => {
      
      const productsQuery = query(collection(db, "products"), where("created_by", "==", auth.currentUser.uid));
      const productsData = await getDocs(productsQuery);
      
      if (!productsData.empty) for (const docRef of productsData.docs) {
        await deleteDoc(doc(db, "products", docRef.id));
        const storageRef = ref(storage, docRef.id);
        await deleteObject(storageRef);
      }
  
      const ordersQuery = query(collection(db, "orders"), where("shop_id", "==", auth.currentUser.uid));
      const ordersData = await getDocs(ordersQuery);
  
      for (const docRef of ordersData.docs) {
        await deleteDoc(doc(db, "orders", docRef.id));
      }
  
      const appointmentsQuery = query(collection(db, "appointments"), where("shop_id", "==", auth.currentUser.uid));
      const appointmentsData = await getDocs(appointmentsQuery);
  
      for (const docRef of appointmentsData.docs) {
        await deleteDoc(doc(db, "appointments", docRef.id));
      }
  
      const usernameQuery = query(collection(db, "usernames"), where("user", "==", auth.currentUser.uid));
      const usernameData = await getDocs(usernameQuery);
  
      for (const docRef of usernameData.docs) {
        await deleteDoc(doc(db, "usernames", docRef.id));
      }

      const storageRef = ref(storage, auth.currentUser.uid);
      await deleteObject(storageRef);

      deleteUser(AuthUser)

      return true

    }).catch((error) => {
      console.error(error)
    })
  };
  

  const getShopByUsername = async (username)=>{
    const q = query(collection(db, "usernames"), where( "username", "==", username))   
    const data = await getDocs(q)    
    if(!data.empty){
      data.forEach((docRef)=>{
        setShop(docRef.data())
      })
    }
  }

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if(currentUser){
        const q = query(collection(db, "usernames"), where( "user", "==", currentUser.uid))   
        const data = await getDocs(q)    
        if(!data.empty){
          data.forEach((docRef)=>{
            setShop(docRef.data())
          })
        }
      }
      setLoading(false);
    });
    return () => unsubuscribe();
  }, []);

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        shop,
        getShopByUsername,
        logout,
        loading,
        resetPassword,
        updateUser,
        deleteShop,
        usernameAvailable,
        checkIfUsernameIsAvailable
      }}
    >
      {children}
    </authContext.Provider>
  );
}