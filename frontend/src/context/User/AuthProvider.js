"use client"
import React, { createContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        let log =window.localStorage.getItem('isLoggedIn');
        if (log) return true;
        return false
    });
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const routes = useRouter();
    useEffect(() => {
        setErrorMessage("")
        const token = Cookies.get("token");
        if (token) {
            fetchUserData(token);
        }
    }, [isLoggedIn]);

    

    

    const handleLogout = () => {
        // Clear the token and user data when logging out
        
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('isLoggedIn');
        routes.refresh()
    };

    const fetchUserData = async (token) => {
        
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                userId,
                isLoggedIn,
                username,
                email,
                errorMessage,
                setIsLoggedIn,
                
                handleLogout,
                fetchUserData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
