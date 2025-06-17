import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import reactLogo from '../assets/react.svg'; // salve a logo aqui ou use o link do CDN

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            auth.login(email, password);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
            <form
                className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 w-96 border border-gray-200 dark:border-gray-700"
                onSubmit={handleLogin}
            >
                <div className="flex justify-center mb-6">
                    <img src={reactLogo} alt="React Logo" className="w-16 h-16 animate-spin-slow" />
                </div>
                <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
                    Login
                </h2>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
                        Senha
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}
