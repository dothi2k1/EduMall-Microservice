"use client"
import React, { createContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setErrorMessage("")
        const token = Cookies.get("token");
        if (token) {
            fetchUserData(token);
        }
    }, [isLoggedIn]);

    

    const handleRegister = async (username, email, password) => {
        try {
           
        } catch (error) {
            console.error("Đã xảy ra lỗi:", error);
            setErrorMessage("Đã xảy ra lỗi trong quá trình đăng ký.");
            return false;
        }
    };

    const handleLogout = () => {
        // Clear the token and user data when logging out
        Cookies.remove("token");
        setIsLoggedIn(false);
        setUsername("");
    };

    const fetchUserData = async (token) => {
        try {
            const response = await fetch(process.env.DOMAIN + "/user/profile", {
                headers: {
                    Authorization: token,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setIsLoggedIn(true);
                setUserId(data.user_id);
                setUsername(data.username);
                setEmail(data.email);
                setUser(data);
            } else {
                console.error("Error fetching user data:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
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
            
                handleRegister,
                handleLogout,
                fetchUserData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
