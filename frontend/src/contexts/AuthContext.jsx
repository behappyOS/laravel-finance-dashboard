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
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            if (!token) {
                setUser(null);
                return;
            }

            setLoading(true);

            try {
                const res = await axios.get('/api/user');

                setUser(res.data.user);
                setLoading(false);

                if (res.data.currentToken && res.data.currentToken !== token) {
                    localStorage.setItem('authToken', res.data.currentToken);
                    setToken(res.data.currentToken);
                }

            } catch (err) {
                logout();
            }
        };

        init();
    }, [token]);

    const fetchUser = async () => {
        try {
            const res = await axios.get('/api/user');

            setUser(res.data.user);

            if (res.data.currentToken && res.data.currentToken !== token) {
                localStorage.setItem('authToken', res.data.currentToken);
                setToken(res.data.currentToken);
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.currentToken}`;
            }
        } catch (error) {
            logout();
        }
    };


    const login = async (email, password, navigate) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/login', { email, password }, { withCredentials: true });
            const apiToken = response.data.access_token;

            localStorage.setItem('authToken', apiToken);

            axios.defaults.headers.common['Authorization'] = `Bearer ${apiToken}`;

            setToken(apiToken);

            await fetchUser();

            navigate('/dashboard');
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
