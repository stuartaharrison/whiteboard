import React from "react";
import { BrowserRouter, Navigate, Route, Routes  } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Signin from './components/Signin';
import Signup from "./components/Signup";

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/404" element={<h1>NOT FOUND</h1>} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;