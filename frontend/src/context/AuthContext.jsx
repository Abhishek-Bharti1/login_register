import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {toast} from "react-toastify"
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in on initial load
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('https://login-register-wytp.vercel.app/api/auth/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(response => {
                setUser(response.data);
                setLoading(false);
            }).catch(() => {
                localStorage.removeItem('token');
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const response = await axios.post('https://login-register-wytp.vercel.app/api/auth/login', { email, password });
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
    };

    const register = async (username,email, password) => {
     try {
        const response = await axios.post('https://login-register-wytp.vercel.app/api/auth/register', { username,email, password });
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
     } catch (error) {
        toast.error(response.data.msg);
     }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };