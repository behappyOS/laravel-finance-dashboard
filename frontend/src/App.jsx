import React, { useEffect, useState } from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Navigate
} from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Carregando...</div>;
    }

    return user ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRoute>
                <DashboardPage />
            </PrivateRoute>
        ),
    },
    {
        path: '*',
        element: <Navigate to="/dashboard" />,
    },
]);

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <AuthProvider>
            <div className="absolute top-4 right-4 z-50">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                >
                    {darkMode ? '☀️ Claro' : '🌙 Escuro'}
                </button>
            </div>

            <RouterProvider
                router={router}
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            />
        </AuthProvider>
    );
}

export default App;
