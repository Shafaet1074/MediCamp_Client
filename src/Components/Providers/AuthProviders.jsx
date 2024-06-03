import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "./firebase.config";


export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});
const AuthProviders = ({children}) => {
  const [user,setUser] =useState(null);
  const[loading,setLoading]=useState(true);

  const LoginUser=(email,password) =>{
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password)
  }

  const SignUpUser =(email,password)=>{
    setLoading(true);
    return  createUserWithEmailAndPassword(auth,email,password)
  }

  const googleLogIn =() =>{
  
    setLoading(true);
    return signInWithPopup(auth,provider)
   
   
}

const updateUserProfile =(name,image) =>{
  return updateProfile(auth.currentUser,{
    displayName: name,
    photoURL: image
  })
}

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      console.log('current user', currentUser);
      setLoading(false);
  });
  return () => {
      return unsubscribe();
  }
}, [])

  const userInfo={
   
    user,
    loading,
    LoginUser,
    SignUpUser,
    googleLogIn,
    updateUserProfile
   };

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProviders;