import React, { useState } from 'react';
import FormContainer from "@/components/FormContainer.tsx";
import Button from "@/components/Button.tsx";

const SettingsPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to update email
    console.log('Email submitted:', email);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to update password
    console.log('Password submitted:', password);
  };

  const handleDeleteUser = () => {
    // Add logic to delete user
    console.log('User deleted');
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <FormContainer>
        <p className="text-fuchsia-600 h-fit font-extrabold font-montserrat text-3xl">
            Settings
        </p>
        <div className="mt-6 flex flex-col">
            <form onSubmit={handleEmailSubmit}>
              <p className="text-fuchsia-600 h-fit text-xl mb-2">
                Change Email
              </p>
              <label htmlFor="email" className="mb-2 text-fuchsia-600 w-full">New Email:</label>
              <input
                className="w-full p-2 border border-fuchsia-600 mt-1"
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <Button type="submit" className="bg-fuchsia-300 mt-4">Save Email</Button>
            </form>
        </div>
        <div className="mt-6 flex flex-col">
            <form onSubmit={handlePasswordSubmit}>
              <p className="text-fuchsia-600 h-fit text-xl mb-2">
                Change Password
              </p>
              <label htmlFor="password" className="mb-2 text-fuchsia-600">New Password:</label>
              <input
                className="w-full p-2 border border-fuchsia-600 mt-1"
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <Button type="submit" className="bg-fuchsia-300 mt-4">Save Password</Button>
            </form>
        </div>
        <div className="mt-6">
            <p className="text-red-500 font-semibold h-fit text-xl mb-2">
                Delete User
            </p>
            <button onClick={handleDeleteUser} className="bg-red-500 text-white px-4 py-2 rounded mt-1">
                Delete
            </button>
        </div>
      </FormContainer>
    </div>
  );
};

export default SettingsPage;
