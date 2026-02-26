
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

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    
    const { register } = useAuth();


    const validateForm = () => {
        const newErrors = {};
        
        // Проверка имени
        if (!formData.full_name.trim()) {
            newErrors.full_name = 'Имя обязательно';
        } else if (formData.full_name.length < 2) {
            newErrors.full_name = 'Имя должно содержать минимум 2 символа';
        } else if (!/^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(formData.full_name)) {
            newErrors.full_name = 'Имя может содержать только буквы, пробелы и дефисы';
        }
        
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
        } else if (!/^[a-zA-Z0-9]+$/.test(formData.password)) {
            newErrors.password = 'Пароль может содержать только латинские буквы и цифры';
        }
        
        // Проверка подтверждения пароля
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают';
        }
        
        // Проверка телефона
        if (formData.phone && !/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
            newErrors.phone = 'Телефон может содержать только цифры и символы +, -, (, )';
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

        const { confirmPassword, ...userData } = formData;
        const result = await register(userData);
        
        if (result.success) {
            onClose();
        } else {
            setServerError(result.error || 'Ошибка регистрации');
        }
        
        setLoading(false);
    };

    return (
        <div className="auth-form">
            <h2>Регистрация</h2>
            
            {serverError && <div className="auth-error server-error">{serverError}</div>}
            
            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label>Полное имя </label>
                    <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className={errors.full_name ? 'error' : ''}
                        placeholder="Введите ваше имя"
                    />
                    {errors.full_name && <span className="field-error">{errors.full_name}</span>}
                </div>

                <div className="form-group">
                    <label>Email </label>
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
                    <label>Телефон</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? 'error' : ''}
                        placeholder="+7 (999) 123-45-67"
                    />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                </div>

                <div className="form-group">
                    <label>Пароль </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? 'error' : ''}
                        placeholder="Минимум 6 символов"
                    />
                    {errors.password && <span className="field-error">{errors.password}</span>}
                </div>

                <div className="form-group">
                    <label>Подтверждение пароля </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={errors.confirmPassword ? 'error' : ''}
                        placeholder="Повторите пароль"
                    />
                    {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
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