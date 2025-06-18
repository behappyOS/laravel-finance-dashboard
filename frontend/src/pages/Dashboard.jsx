import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardPage() {
    const [accounts, setAccounts] = useState([]);
    const { logout } = useAuth();

    useEffect(() => {
        api.get('/accounts')
            .then(res => setAccounts(res.data))
            .catch(err => {
                if (err.response.status === 401) {
                    alert('Sessão expirada, faça login novamente');
                    logout();
                }
            });
    }, [logout]);

    return (
        <div className="p-6">
            <h1 className="text-xl mb-4">Contas</h1>
            <ul>
                {accounts.map(account => (
                    <li key={account.id}>{account.name} - R$ {account.balance}</li>
                ))}
            </ul>
            <button
                onClick={() => logout()}
                className="mt-6 bg-red-600 text-white px-4 py-2"
            >
                Sair
            </button>
        </div>
    );
}
