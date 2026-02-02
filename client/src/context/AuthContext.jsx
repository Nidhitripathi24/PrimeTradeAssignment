import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const { data } = await api.get('/auth/me');
                    setUser({ ...data, token }); // user object from 'me' doesn't have token usually, but we keep it sync
                } catch (error) {
                    console.error("Auth check failed", error);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        setUser(data);
    };

    const signup = async (name, email, password) => {
        const { data } = await api.post('/auth/signup', { name, email, password });
        localStorage.setItem('token', data.token);
        setUser(data);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const updateUser = async (userData) => {
        const { data } = await api.put('/auth/me', userData);
        // If token creates new token on update? API does return token.
        if (data.token) {
            localStorage.setItem('token', data.token);
        }
        setUser(prev => ({ ...prev, ...data }));
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};
