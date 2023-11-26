import React from 'react';
import MessageBox from '@/components/MessageBox';
import BurgerMenu from './BurgerMenu';

interface MessagesContainerProps {
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({}) => {

    const numberOfMessageBoxes = 30;

    // Create an array of message data objects
    const messageDataArray = Array.from({ length: numberOfMessageBoxes }, (_, index) => ({
        messageId: index + 1, // Adjust the logic based on your requirements
    }));

    return (
        <div className={`bg-fuchsia-50 border-fuchsia-300 border h-screen w-96 min-w-fit overflow-y-auto overflow-hidden`}>
            <div className='min-h-fit py-4 pl-4 sticky top-0 bg-inherit border-r border-b border-fuchsia-300'>
                <BurgerMenu />
            </div>
            {messageDataArray.map((messageData) => (
                <MessageBox key={messageData.messageId} accountId={messageData.messageId} />
            ))}
      </div>
    );
};

export default MessagesContainer;
