import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({ children, className, type = "button" }) => {
  return (
    <button className={`text-white px-4 py-2 rounded ${className}`} type={type}>
      {children}
    </button>
  );
};

export default Button;
