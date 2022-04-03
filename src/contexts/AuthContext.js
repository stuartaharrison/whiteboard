import React, { useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../firebase-config';
import { GetGravatarIconUrl } from '../helpers/Gravatar';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signin = (emailAddress, password) => {
        return signInWithEmailAndPassword(
            auth,
            emailAddress,
            password
        ); 
    };

    const signout = () => {
        return signOut(auth);
    };

    const signup = (emailAddress, password) => {
        return createUserWithEmailAndPassword(
            auth,
            emailAddress,
            password
        );
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                setCurrentUser(currentUser);
            }
            else {
                setCurrentUser({
                    uid: currentUser.uid,
                    email: currentUser.email,
                    displayName: currentUser.displayName ?? currentUser.email,
                    photoURL: GetGravatarIconUrl(currentUser.email)
                });
            }
            
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signin,
        signout,
        signup
    };
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};