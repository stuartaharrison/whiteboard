import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { signup } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(email, password);
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

export default Signup;
