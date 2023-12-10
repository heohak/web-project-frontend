import React, { useEffect, useState } from 'react';

interface SwipeContainerProps {}

const SwipeContainer: React.FC<SwipeContainerProps> = ({}) => {
  const [swipeContainerData, setSwipeContainerData] = useState<{
    id: number;
    name: string;
    age: number;
    bio: string;
    picture: string;
  } | null>(null);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`/api/profile/random`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
      });

      if (response.ok) {
        const accountData = await response.json();

        setSwipeContainerData({
          id: accountData.id,
          name: accountData.name,
          age: accountData.age,
          bio: accountData.bio,
          picture: accountData.picture,
        });
      } else {
        // If there was an error, you can handle it accordingly
        setSwipeContainerData(null);
        const errorData = await response.json();
        console.error(`Failed to fetch user details: ${errorData.error}`);
      }
    } catch (error) {
      // If there was a network error or other issue, display an error message
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const handleReject = () => {
    console.log('Profile rejected');
    fetchUserDetails(); // Fetch a new random account
  };

  const handleAccept = async () => {
    try {
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify({
          id: swipeContainerData?.id,
        })
      });

      if (response.ok) {
        console.log('Match successful!');
      } else {
        console.error('Failed to match');
      }
    } catch (error) {
      console.error('Error matching:', error);
    }
    console.log('Profile accepted');
    fetchUserDetails(); // Fetch a new random account
  };

  return (
    <div className={`bg-fuchsia-50 w-1/3 h-screen overflow-y-auto overflow-hidden border border-fuchsia-300`}>
      {swipeContainerData ? (
        <>
          <img src={swipeContainerData.picture} className='object-contain w-full border-r border-fuchsia-300'/>
          <div className='border-fuchsia-300 border-t border-r'>
            <div className='text-fuchsia-600 text-3xl pl-4 pt-2 pb-1'>
              <p>{swipeContainerData.name}, {swipeContainerData.age}</p>
            </div>
          </div>
          <div className='border-fuchsia-300 border-r'>
            <div className='text-fuchsia-400 text-xl px-4 pt-3 pb-12'>
              <p>{swipeContainerData.bio}</p>
            </div>
          </div>
              
          <div className='bg-gradient-to-t from-fuchsia-200 via-fuchsia-100 to-transparent h-24 sticky bottom-0 flex justify-between border-fuchsia-300 border-r'>
            <button className='bg-red-400 w-20 h-20 rounded-full flex justify-center items-center md:ml-6 lg:ml-8' onClick={handleReject}>
              <div className='w-12 h-3 rotate-45 absolute bg-button-white-100 rounded-full'></div>
              <div className='w-12 h-3 -rotate-45 absolute bg-button-white-100 rounded-full'></div>
            </button>
            <button className='bg-green-400 w-20 h-20 rounded-full flex justify-center items-center md:mr-6 lg:mr-8' onClick={handleAccept}>
              <img src='/heart.svg' className='w-11'/>
            </button>
          </div>
        </>
      ) : (
        <div className='text-fuchsia-600 text-2xl pl-5 pt-5'>
          <p>No profiles to swipe 😞</p>
        </div>
      )}
    </div>
  );
};

export default SwipeContainer;
