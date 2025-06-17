import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardPage() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Financeiro</h1>
                    <div className="flex items-center">
                        <span className="text-gray-600 mr-4">Olá, {user?.name || 'Usuário'}!</span>
                        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Bem-vindo!</h2>
                    <p>Aqui ficarão seus gráficos e tabelas de transações.</p>
                    <p className="mt-4 font-semibold">Próximo passo: Construir o CRUD de Categorias aqui dentro!</p>
                </div>
            </main>
        </div>
    );
}
