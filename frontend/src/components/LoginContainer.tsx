import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
}

const LoginContainer: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className="flex flex-col bg-fuchsia-50 h-max w-1/4 rounded-xl p-8">{children}</div>
        )
}

export default LoginContainer;