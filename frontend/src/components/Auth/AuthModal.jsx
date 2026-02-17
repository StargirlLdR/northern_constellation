// src/components/Auth/AuthModal.jsx
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './Auth.css';

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);

    if (!isOpen) return null;

    return (
        <div className="auth-modal-overlay" onClick={onClose}>
            <div className="auth-modal-content" onClick={e => e.stopPropagation()}>
                <button className="auth-modal-close" onClick={onClose}>×</button>
                
                {isLogin ? (
                    <LoginForm 
                        onSwitchToRegister={() => setIsLogin(false)} 
                        onClose={onClose}
                    />
                ) : (
                    <RegisterForm 
                        onSwitchToLogin={() => setIsLogin(true)} 
                        onClose={onClose}
                    />
                )}
            </div>
        </div>
    );
};

export default AuthModal;