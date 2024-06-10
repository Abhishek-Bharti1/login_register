import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import DOMPurify from 'dompurify';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
const Login = () => {
    const { login } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();

    const onSubmit = async data => {
        const sanitizedData = {
            email: DOMPurify.sanitize(data.email),
            password: DOMPurify.sanitize(data.password)
        };
        try {
            await login(sanitizedData.email, sanitizedData.password);
            toast.success('Login successful!');

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Login</h2>
            <div>
                <label>Email:</label>
                <input type="email" {...register('email', { required: true })} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" {...register('password', { required: true })} />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
