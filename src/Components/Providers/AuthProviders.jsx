import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "./firebase.config";
import Swal from "sweetalert2";
import useAxiosPublic, { axiosPublic } from "../../Hooks/USeAxiosPublic";


export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account'
});
const AuthProviders = ({children}) => {
  const [user,setUser] =useState(null);
  const[loading,setLoading]=useState(true);
  const axiosPublic = useAxiosPublic();


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

const LogOut = () =>{

  setUser(null)
  
  signOut(auth)
  .then(()=>{
    Swal.fire("Log out done")

  })
}

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if(currentUser){
          const userInfo={
            email:currentUser.email
          };
          axiosPublic.post('/jwt',userInfo)
          .then(res=>{
            if(res.data.token){
              localStorage.setItem('access-token', res.data.token);
            }
          })
      }
      else{
        // do somethjing
        localStorage.removeItem('access-token');
      }
      setLoading(false);
  });
  return () => {
      return unsubscribe();
  }
}, [axiosPublic])

  const userInfo={
   
    user,
    loading,
    LoginUser,
    SignUpUser,
    googleLogIn,
    updateUserProfile,
    LogOut
   };

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProviders;