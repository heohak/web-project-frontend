import React from 'react';
import MessagesContainer from '@/components/MessagesContainer';


const MainPage: React.FC = () => {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <MessagesContainer>
                Messages
            </MessagesContainer>
            <div className='bg-fuchsia-500 flex-1'>
                Swipe area
            </div>
        </div>

    )
}

export default MainPage;