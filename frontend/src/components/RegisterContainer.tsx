import * as React from "react";


interface RegisterContainerProps {
    children: React.ReactNode;
}

const RegisterContainer: React.FC<RegisterContainerProps> = ({ children }) => {
    return (
        <div className="flex flex-col bg-fuchsia-50 h-max w-1/4 min-w-fit max-w-lg my-28 rounded-xl p-8">{children}</div>
        )
}

export default RegisterContainer;