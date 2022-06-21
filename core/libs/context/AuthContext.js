import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from 'utils/api';

const AuthContext = createContext();
export { AuthContext };

export const AuthProvider = ({ children }) => {
    const [me, setMe] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (storedToken && storedUser) {
            setToken(storedToken);
            setMe(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await authAPI.login({ email, password });
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setToken(token);
        setMe(user);
        return res.data;
    };

    const signup = async (data) => {
        return await authAPI.signup(data);
    };

    const verifyOtp = async (email, otp) => {
        const res = await authAPI.verifyOtp({ email, otp });
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setToken(token);
        setMe(user);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setMe(null);
    };

    return (
        <AuthContext.Provider value={{ me, token, loading, login, signup, verifyOtp, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
