import React, { useEffect, useState } from 'react';
import FormContainer from "@/components/FormContainer.tsx";
import Button from "@/components/Button.tsx";
import LinkButton from "@/components/LinkButton.tsx";

const SettingsPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Fetch user details when the component mounts
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch('/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any other necessary headers (e.g., authentication token)
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setEmail(userData.email);
        // You can also fetch and display other user details here if needed
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log('Email updated successfully');
      } else {
        console.error('Failed to update email');
      }
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        console.log('Password updated successfully');
      } else {
        console.error('Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleDeleteUser = async () => {
    // Add logic to confirm and delete user
    try {
      const response = await fetch('/api/user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
      });

      if (response.ok) {
        console.log('User deleted successfully');
        // Redirect to login or another page after deletion if needed
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="absolute top-0 right-0 m-4">
        <LinkButton className='bg-fuchsia-300' to="/">Back to main page</LinkButton>
      </div>
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
