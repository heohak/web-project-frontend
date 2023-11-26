import MessagesContainer from '@/components/MessagesContainer';

import React from 'react';

import '@/styles/scrollbar.css';
import SwipeContainer from '@/components/SwipeContainer';


const MainPage: React.FC = () => {
    const accountId = '123'; // TODO: Replace with actual accountId fetching logic

    return (
        <div className="flex min-h-screen items-center justify-center">
            <MessagesContainer />
            <div className='flex-1 justify-center flex'>
                <SwipeContainer accountId={accountId} />
            </div>
        </div>

    )
}

export default MainPage;