
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const LoginForm = ({ onSwitchToRegister, onClose }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    
    const { login } = useAuth();

    // Функция валидации
    const validateForm = () => {
        const newErrors = {};
        
        // Проверка email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'Email обязателен';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Введите корректный email (пример: name@domain.com)';
        }
        
        // Проверка пароля
        if (!formData.password) {
            newErrors.password = 'Пароль обязателен';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Пароль должен содержать минимум 6 символов';
        }
        
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        setServerError('');

        const result = await login(formData.email, formData.password);
        
        if (result.success) {
            onClose();
        } else {
            setServerError(result.error || 'Неверный email или пароль');
        }
        
        setLoading(false);
    };

    return (
        <div className="auth-form">
            <h2>Вход в аккаунт</h2>
            
            {serverError && <div className="auth-error server-error">{serverError}</div>}
            
            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                        placeholder="Введите email"
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label>Пароль</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? 'error' : ''}
                        placeholder="Введите пароль"
                    />
                    {errors.password && <span className="field-error">{errors.password}</span>}
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