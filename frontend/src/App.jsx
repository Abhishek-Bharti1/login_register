import React from 'react';
import {  Route,Routes, Link, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import "./App.css";
import { ToastContainer } from 'react-toastify';

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <nav>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </nav>
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </AuthProvider>
    );
};

export default App;
