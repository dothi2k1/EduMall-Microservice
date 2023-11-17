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

    const handleLogin = async (usernameOrEmail, password) => {
        try {
            const response = await fetch(process.env.DOMAIN + "/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ usernameOrEmail, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                Cookies.set("token", token, {
                    expires: 1, // Cookie expires in 1 day
                    secure: true, // Send cookie only over HTTPS
                    sameSite: "strict", // Restrict cookie to the same site
                });
                // Fetch user data from the server using the token
                fetchUserData(token);
                setErrorMessage("Đăng nhập thành công");
                return true;
            } else {
                const data = await response.json();
                setErrorMessage(data.message || "Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập.");
                return false;
            }
        } catch (error) {
            console.error("Đã xảy ra lỗi:", error);
            setErrorMessage("Đã xảy ra lỗi trong quá trình đăng nhập.");
            return false;
        }
    };

    const handleRegister = async (username, email, password) => {
        try {
            const response = await fetch(process.env.DOMAIN + "/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                setErrorMessage("Đăng ký thành công, đang đăng nhập")
                const success = await handleLogin(username, password);
                return success;
            } else {
                const data = await response.json();
                setErrorMessage(data.message || "Đăng ký không thành công. Vui lòng kiểm tra thông tin đăng ký.");
                return false;
            }
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
                handleLogin,
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
