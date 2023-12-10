// MessageBox.tsx
import React from 'react';
import LinkButton from '@/components/LinkButton';

interface MessageBoxProps {
  name: string | null;
  age: number | null;
  picture: string | null;
}

const MessageBox: React.FC<MessageBoxProps> = ({ name, age, picture }) => (
  <LinkButton to='/' className={`border-fuchsia-300 border border-t-0 flex w-96 rounded-none bg-fuchsia-200 hover:bg-fuchsia-300`}>
    <div className='flex items-center'>
      {picture ? (
        <div className='bg-fuchsia-600 rounded-full w-10 h-10 flex items-center justify-center'>
          <img src={picture} alt="Profile" />
        </div>
      ) : (
        <div className='bg-fuchsia-600 rounded-full w-10 h-10 flex items-center justify-center'>
          {/* Placeholder or fallback content if there's no picture */}
          📷
        </div>
      )}
      <div className='ml-4'>
        {name && (
          <p className='text-fuchsia-600'>{name}, {age}</p>
        )}
      </div>
    </div>
  </LinkButton>
);

export default MessageBox;
