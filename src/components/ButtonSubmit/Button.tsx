import React from 'react';
import './Button.css';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'tertiary';
    disabled?: boolean;
    className?: string;
}

const SubmitButton: React.FC<ButtonProps> = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    disabled = false,
    className = '',
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`btn btn-${variant} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default SubmitButton;
