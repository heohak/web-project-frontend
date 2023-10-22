import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ to, children, className }) => {
  return <Link to={to} className={`bg-fuchsia-400 text-white px-4 py-2 rounded ${className}`}>{children}</Link>;
};

export default Button;