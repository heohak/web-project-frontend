import MessagesContainer from '@/components/MessagesContainer';

import React from 'react';

import '@/styles/scrollbar.css';


const MainPage: React.FC = () => {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <MessagesContainer />
            <div className='bg-fuchsia-500 flex-1'>
                Swipe area
            </div>
        </div>

    )
}

export default MainPage;