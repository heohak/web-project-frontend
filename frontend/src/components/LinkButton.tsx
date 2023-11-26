import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
    to: string;
    children: React.ReactNode;
    className?: string;
    type?: "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({ to, children, className, type = "button" }) => {
    return (
        <Link to={to} className={`text-white px-4 py-2 rounded ${className}`} type={type}>
            {children}
        </Link>
    );
};

export default Button;
