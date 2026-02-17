// src/components/Auth/LoginForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const LoginForm = ({ onSwitchToRegister, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await login(email, password);
        
        if (result.success) {
            onClose();
        } else {
            setError(result.error || 'Неверный email или пароль');
        }
        
        setLoading(false);
    };

    return (
        <div className="auth-form">
            <h2>Вход в аккаунт</h2>
            
            {error && <div className="auth-error">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Введите email"
                    />
                </div>

                <div className="form-group">
                    <label>Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Введите пароль"
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Вход...' : 'Войти'}
                </button>
            </form>

            <p className="auth-switch">
                Нет аккаунта?{' '}
                <button onClick={onSwitchToRegister} className="switch-btn">
                    Зарегистрироваться
                </button>
            </p>
        </div>
    );
};

export default LoginForm;