import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import DOMPurify from 'dompurify';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Register = () => {
    const { register: registerUser } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
const navigate = useNavigate();
    const onSubmit = async data => {
        const sanitizedData = {
            username: DOMPurify.sanitize(data.username),
            email: DOMPurify.sanitize(data.email),
            password: DOMPurify.sanitize(data.password)
        };
        try {
            await registerUser(sanitizedData.username,sanitizedData.email, sanitizedData.password);
            toast.success('Register successful!');
            navigate('/login');
        } catch (error) {
            console.error(error);
            toast.error('Please check your credentials and try again');

        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Register</h2>
            <div>
                <label>Username:</label>
                <input type="text" {...register('username', { required: true })} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" {...register('email', { required: true })} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" {...register('password', { required: true })} />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
