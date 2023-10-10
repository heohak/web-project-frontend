import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  to: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ to, children, style, className }) => {
  return <Link to={to} style={style} className={className}>{children}</Link>;
};

export default Button;