import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebaseAuth/FirebaseAuth";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
     const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true);

     const provider = new GoogleAuthProvider();

     const createUser = (email, password) => {
          setLoading(true);
          return createUserWithEmailAndPassword(auth, email, password);
     }

     const loginUser = (email, password) => {
          setLoading(true);
          return signInWithEmailAndPassword(auth, email, password);
     }

     const updateUserProfile = profileInfo => {
          return updateProfile(auth.currentUser, profileInfo);
     }

     const signOutUser = () => {
          setLoading(true);
          return signOut(auth)
     }

     const googleLogin = () => {
          setLoading(true);
          return signInWithPopup(auth, provider);
     }

     const PasswordReset = (email) => {
          setLoading(true);
          return sendPasswordResetEmail(auth, email);
     }

     useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, currentUser => {
               setUser(currentUser);
               setLoading(false);
          })

          return () => {
               unsubscribe();
          }
     }, [])

     const userInfo = {
          user,
          setUser,
          loading,
          loginUser,
          createUser,
          googleLogin,
          signOutUser,
          PasswordReset,
          updateUserProfile
     }

     return <AuthContext value={userInfo}>{children}</AuthContext>
};

export default AuthProvider;