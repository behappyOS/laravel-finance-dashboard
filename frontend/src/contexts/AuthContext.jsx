import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('authToken'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const init = async () => {
            if (!token) {
                setUser(null);
                return;
            }

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setLoading(true);

            try {
                const res = await axios.get('/api/user');
                console.log('User fetched:', res.data);

                setUser(res.data.user);
                setLoading(false);

                if (res.data.currentToken && res.data.currentToken !== token) {
                    localStorage.setItem('authToken', res.data.currentToken);
                    setToken(res.data.currentToken);
                }

            } catch (err) {
                console.error('Erro ao buscar usuário:', err);
                logout();
            }
        };

        init();
    }, [token]);

    const fetchUser = async () => {
        try {
            const res = await axios.get('/api/user');
            console.log('User fetched:', res.data);

            setUser(res.data.user);

            if (res.data.currentToken && res.data.currentToken !== token) {
                localStorage.setItem('authToken', res.data.currentToken);
                setToken(res.data.currentToken);
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.currentToken}`;
            }
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            logout();
        }
    };


    const login = async (email, password, navigate) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/login', { email, password }, { withCredentials: true });
            const apiToken = response.data.access_token;
            console.log('TOKEN:', apiToken);
            localStorage.setItem('authToken', apiToken);
            setToken(apiToken);

            try {
                await fetchUser();
            } catch (e) {
                console.error('Erro no fetchUser após login:', e);
            }

            navigate('/dashboard');
            setLoading(false);
        } catch (error) {
            setLoading(false);
            const msg = error.response?.data?.message || 'Falha no login';
            console.error('Erro no login:', error);
            throw new Error(msg);
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        login,
        logout,
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
