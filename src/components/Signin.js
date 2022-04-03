import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Signin = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { signin } = useAuth();
    const navigator = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signin(email, password);
            navigator('/');
        }
        catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="email address" />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                <button type="submit">Signup</button>
            </form>
        </>
    );
};

export default Signin;