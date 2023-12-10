import React, { useEffect, useState } from 'react';
import MessageBox from '@/components/MessageBox';
import BurgerMenu from './BurgerMenu';

interface MessagesContainerProps {
}

const MessagesContainer: React.FC<MessagesContainerProps> = () => {
  const [messageDataArray, setMessageDataArray] = useState<Array<{
    name: string | null;
    age: number | null;
    picture: string | null;
  }>>([]);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const response = await fetch(`/api/match`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
          }
        });
        const matchDataArray = await response.json();

        setMessageDataArray(matchDataArray);
      } catch (error) {
        console.error('Error fetching message details:', error);
      }
    };
    fetchMatchDetails();
  }, []);

  return (
    <div className={`bg-fuchsia-50 border-fuchsia-300 border h-screen w-96 min-w-fit overflow-y-auto overflow-hidden`}>
      <div className='min-h-fit py-4 pl-4 sticky top-0 bg-inherit border-r border-b border-fuchsia-300'>
        <BurgerMenu />
      </div>
      {messageDataArray.length === 0 ? (
        <p className="text-fuchsia-500 text-m pl-3 pt-3">You currently have no matches 😞</p>
      ) : (
        messageDataArray.map((messageData, index) => (
          <MessageBox
            key={index}
            name={messageData.name}
            age={messageData.age}
            picture={messageData.picture}
          />
        ))
      )}
    </div>
  );
};

export default MessagesContainer;
