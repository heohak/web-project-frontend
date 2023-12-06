import * as React from "react";


interface FormContainerProps {
    children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
    return (
        <div className="flex flex-col bg-fuchsia-50 h-max w-1/4 max-w-lg my-28 rounded-xl p-8">{children}</div>
        )
}

export default FormContainer;