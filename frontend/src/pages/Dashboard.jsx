import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardPage() {
    const [accounts, setAccounts] = useState([]);
    const { logout } = useAuth();
    const [newAccount, setNewAccount] = useState({ name: '', balance: '' });
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        setDarkMode(document.documentElement.classList.contains('dark'));
    }, []);

    const fetchAccounts = () => {
        api.get('/accounts')
            .then(res => setAccounts(res.data?.data ?? res.data))
            .catch(err => {
                if (err.response?.status === 401) {
                    alert('Sessão expirada, faça login novamente');
                    logout();
                } else {
                    console.error('Erro ao carregar contas:', err);
                }
            });
    };

    useEffect(() => {
        fetchAccounts();
    }, [logout]);

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/accounts', {
                name: newAccount.name,
                balance: parseFloat(newAccount.balance),
            });
            setNewAccount({ name: '', balance: '' });
            fetchAccounts();
            setModalOpen(false);
        } catch (err) {
            console.error('Erro ao criar conta:', err);
            alert('Erro ao criar conta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`min-h-screen transition-colors duration-500 ${
                darkMode
                    ? 'bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-gray-100'
                    : 'bg-gradient-to-tr from-blue-100 via-white to-blue-200 text-gray-900'
            }`}
        >
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-semibold mb-6">Contas</h1>

                <ul className="mb-6">
                    {Array.isArray(accounts) && accounts.length ? (
                        accounts.map(account => (
                            <li key={account.id}>
                                {account.name} - R$ {Number(account.balance || 0).toFixed(2)}
                            </li>
                        ))
                    ) : (
                        <li>Nenhuma conta cadastrada.</li>
                    )}
                </ul>

                <button
                    onClick={() => setModalOpen(true)}
                    className="mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    + Nova Conta
                </button>

                {modalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">Nova Conta</h2>
                            <form onSubmit={handleCreateAccount} className="space-y-4">
                                <div>
                                    <label className="block text-sm mb-1 dark:text-gray-300">Nome</label>
                                    <input
                                        type="text"
                                        value={newAccount.name}
                                        onChange={e => setNewAccount({ ...newAccount, name: e.target.value })}
                                        required
                                        className="border p-2 w-full rounded dark:bg-gray-800 dark:text-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1 dark:text-gray-300">Saldo Inicial</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={newAccount.balance}
                                        onChange={e => setNewAccount({ ...newAccount, balance: e.target.value })}
                                        required
                                        className="border p-2 w-full rounded dark:bg-gray-800 dark:text-gray-100"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setModalOpen(false)}
                                        className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {loading ? 'Salvando...' : 'Criar'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <button
                    onClick={() => logout()}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                >
                    Sair
                </button>
            </div>
        </div>
    );
}
