import React, { useEffect, useState } from 'react';

interface SwipeContainerProps {
}

const SwipeContainer: React.FC<SwipeContainerProps> = ({}) => {
    const [swipeContainerData, setSwipeContainerData] = useState({
        // We'll need to implement the actual fetch logic, but this is the data we'll need for the swipe container.
        name: 'Uno Nisu',
        age: 25,
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquet nisl nunc eget nunc. Donec euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquet nisl nunc eget nunc. Donec euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquet nisl nunc eget nunc. Donec euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquet nisl nunc eget nunc. Donec euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquet nisl nunc eget nunc. Donec euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vitae aliquet nisl nunc eget nunc.',
        picture: 'data:image/png;base64,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'
    })

    const fetchUserDetails = async () => {
        try {
            const response = await fetch(`/api/profile/random`);
            const accountData = await response.json();

            setSwipeContainerData({
                name: accountData.name,
                age: accountData.age,
                bio: accountData.bio,
                picture: accountData.picture,
            });
        } catch (error) {
            console.error('Error fetching message details:', error);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    const handleReject = () => {
        // Add logic for rejecting the profile
        console.log('Profile rejected');
        fetchUserDetails(); // Fetch a new random account
    };

    const handleAccept = () => {
        // Add logic for accepting the profile
        console.log('Profile accepted');
        fetchUserDetails(); // Fetch a new random account
    };

    return (
        <div className={`bg-fuchsia-50 w-1/3 h-screen overflow-y-auto overflow-hidden border border-fuchsia-300`}>
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
        </div>
    );
};

export default SwipeContainer;
