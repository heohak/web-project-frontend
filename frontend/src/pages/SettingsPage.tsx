import React, { useState } from 'react';
import FormContainer from "@/components/FormContainer.tsx";
import Button from "@/components/Button.tsx";
import LinkButton from "@/components/LinkButton.tsx";
import { useNavigate } from "react-router-dom";

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDOB] = useState('');
  const [gender, setGender] = useState('');
  const [notification, setNotification] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleDOBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDOB(e.target.value);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const showNotification = (message: string) => {
    setNotification(message);

    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/user/email', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify({ "newEmail": email }),
      });

      if (response.ok) {
        console.log('Email updated successfully');
        showNotification('Email updated successfully');
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
      const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify({ "newPassword": password }),
      });

      if (response.ok) {
        console.log('Password updated successfully');
        showNotification('Password updated successfully');
      } else {
        console.error('Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleFirstNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/user/firstName', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify({ "newFirstName": firstName }),
      });

      if (response.ok) {
        console.log('First name updated successfully');
        showNotification('First name updated successfully');
      } else {
        console.error('Failed to update first name');
      }
    } catch (error) {
      console.error('Error updating first name:', error);
    }
  };

  const handleLastNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/user/lastName', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify({ "newLastName": lastName }),
      });

      if (response.ok) {
        console.log('Last name updated successfully');
        showNotification('Last name updated successfully');
      } else {
        console.error('Failed to update last name');
      }
    } catch (error) {
      console.error('Error updating last name:', error);
    }
  };

  const handleDOBSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/user/dateOfBirth', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify({ "newDateOfBirth": dob }),
      });

      if (response.ok) {
        console.log('Date of birth updated successfully');
        showNotification('Date of birth updated successfully');
      } else {
        console.error('Failed to update date of birth');
      }
    } catch (error) {
      console.error('Error updating date of birth:', error);
    }
  };

  const handleGenderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/user/gender', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify({ "genderMale": gender == "male"}),
      });

      if (response.ok) {
        console.log('Gender updated successfully');
        showNotification('Gender updated successfully');
      } else {
        console.error('Failed to update gender');
      }
    } catch (error) {
      console.error('Error updating gender:', error);
    }
  };

  const handleDeleteUser = async () => {
    const ok = confirm("Are you sure you want to delete your account? Your profile and matches will be lost.");
    if (!ok) return;

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
        navigate("/logout")
      } else {
        const err = await response.json();
        if (err.message) {
          alert(err.message);
        }
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
        <div className="mt-6 flex flex-col">
          <form onSubmit={handleFirstNameSubmit}>
            <p className="text-fuchsia-600 h-fit text-xl mb-2">
              Change First Name
            </p>
            <label htmlFor="firstName" className="mb-2 text-fuchsia-600 w-full">New First Name:</label>
            <input
              className="w-full p-2 border border-fuchsia-600 mt-1"
              type="text"
              id="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
              required
            />
            <Button type="submit" className="bg-fuchsia-300 mt-4">Save First Name</Button>
          </form>
        </div>
        <div className="mt-6 flex flex-col">
          <form onSubmit={handleLastNameSubmit}>
            <p className="text-fuchsia-600 h-fit text-xl mb-2">
              Change Last Name
            </p>
            <label htmlFor="lastName" className="mb-2 text-fuchsia-600 w-full">New Last Name:</label>
            <input
              className="w-full p-2 border border-fuchsia-600 mt-1"
              type="text"
              id="lastName"
              value={lastName}
              onChange={handleLastNameChange}
              required
            />
            <Button type="submit" className="bg-fuchsia-300 mt-4">Save Last Name</Button>
          </form>
        </div>
        <div className="mt-6 flex flex-col">
          <form onSubmit={handleDOBSubmit}>
            <p className="text-fuchsia-600 h-fit text-xl mb-2">
              Change Date of Birth
            </p>
            <label htmlFor="dob" className="mb-2 text-fuchsia-600 w-full">New Date of Birth:</label>
            <input
              className="w-full p-2 border border-fuchsia-600 mt-1"
              type="date"
              id="dob"
              value={dob}
              onChange={handleDOBChange}
              required
            />
            <Button type="submit" className="bg-fuchsia-300 mt-4">Save Date of Birth</Button>
          </form>
        </div>
        <div className="mt-6 flex flex-col">
          <form onSubmit={handleGenderSubmit}>
            <p className="text-fuchsia-600 h-fit text-xl mb-2">
              Change Gender
            </p>
            <label htmlFor="gender" className="mb-2 text-fuchsia-600 w-full">New Gender:</label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={handleGenderChange}
              className="w-full border border-fuchsia-600 p-2 outline-fuchsia-700"
              required
            >
            <option value="" disabled>Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <Button type="submit" className="bg-fuchsia-300 mt-4">Save Gender</Button>
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
        {notification && (
          <div className="mt-4 bg-green-500 text-white font-semibold rounded-md p-3">
            <p>{notification}</p>
          </div>
          )}
      </FormContainer>
    </div>
  );
};

export default SettingsPage;
