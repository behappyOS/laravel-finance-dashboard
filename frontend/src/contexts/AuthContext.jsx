import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            api.get('/user')
                .then(response => {
                    setUser(response.data);
                })
                .catch(() => {
                    // Token inválido, limpa
                    localStorage.removeItem('authToken');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/login', { email, password });
            const { token, user } = response.data; // Supondo que a API retorna token e user

            localStorage.setItem('authToken', token);
            setUser(user);

            navigate('/dashboard');
        } catch (error) {
            console.error("Falha no login:", error);
            alert('Email ou senha inválidos!');
        }
    };

    const logout = () => {
        api.post('/logout').finally(() => {
            setUser(null);
            localStorage.removeItem('authToken');
            navigate('/login');
        });
    };

    const value = { user, loading, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
