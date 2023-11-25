import React from 'react';

interface MessagesContainerProps {
  children: React.ReactNode;
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({ children }) => {
  return (
    <div className={`bg-fuchsia-50 border-fuchsia-300 border text-white h-screen w-36 min-w-fit`}>
      {children}
    </div>
  );
};

export default MessagesContainer;
