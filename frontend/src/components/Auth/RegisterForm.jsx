// src/components/Auth/RegisterForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const RegisterForm = ({ onSwitchToLogin, onClose }) => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { register } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        setLoading(true);
        setError('');

        const { confirmPassword, ...userData } = formData;
        const result = await register(userData);
        
        if (result.success) {
            onClose();
        } else {
            setError(result.error || 'Ошибка регистрации');
        }
        
        setLoading(false);
    };

    return (
        <div className="auth-form">
            <h2>Регистрация</h2>
            
            {error && <div className="auth-error">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Полное имя</label>
                    <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                        placeholder="Введите ваше имя"
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Введите email"
                    />
                </div>

                <div className="form-group">
                    <label>Телефон (необязательно)</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+7 (999) 123-45-67"
                    />
                </div>

                <div className="form-group">
                    <label>Пароль</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                        placeholder="Минимум 6 символов"
                    />
                </div>

                <div className="form-group">
                    <label>Подтверждение пароля</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Повторите пароль"
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>
            </form>

            <p className="auth-switch">
                Уже есть аккаунт?{' '}
                <button onClick={onSwitchToLogin} className="switch-btn">
                    Войти
                </button>
            </p>
        </div>
    );
};

export default RegisterForm;