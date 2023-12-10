import FormContainer from "@/components/FormContainer.tsx";
import Button from "@/components/Button.tsx";
import LinkButton from "@/components/LinkButton.tsx"

import React, { useState, useEffect } from 'react';

import '@/styles/upload-button.css';

const ProfileEditPage: React.FC = () => {
    const [genderPreferenceMale, setGenderPreferenceMale] = useState('');
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [profileActive, setProfileActive] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        const fetchProfileDetails = async () => {
            try {
              const response = await fetch('/api/profile', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
              });
            
              if (response.ok) {
                const profile = await response.json();
                setProfileActive(profile.profileActive);
                setProfilePicture(profile.picture);
                setBio(profile.bio);
                setGenderPreferenceMale(profile.genderPreferenceMale ? "male" : "female");
              } else {
                console.error('Failed to fetch profile details');
              }
            } catch (error) {
              console.error('Error fetching profile details:', error);
            } finally {
              setLoading(false);
            }
        };
        fetchProfileDetails();
      }, []
    );

    const showNotification = (message: string) => {
      setNotification(message);

      setTimeout(() => {
        setNotification('');
      }, 5000);
    };

    const handleGenderPreferenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGenderPreferenceMale(e.target.value);
    };

    const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setBio(e.target.value);
    };

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length === 1) {
          const file: File = fileInput.files[0];
          const reader: FileReader = new FileReader();
          reader.addEventListener("load", () => {
            if (typeof reader.result === "string") {
              setProfilePicture(reader.result);
            }
          }, false);
          reader.readAsDataURL(file);
        }
    };

    const handleGenderPreferenceSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          const response = await fetch('/api/profile/genderPreference', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({ "newGenderPreferenceMale": genderPreferenceMale == "male"}),
          });
    
          if (response.ok) {
            console.log('Gender preference updated successfully');
            showNotification('Gender preference updated successfully');
          } else {
            console.error('Failed to update gender preference');
          }
        } catch (error) {
          console.error('Error updating gender preference:', error);
        }
    };

    const handleBioSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const response = await fetch('/api/profile/bio', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
          },
          body: JSON.stringify({ "newBio": bio }),
        });

        if (response.ok) {
          console.log('Bio updated successfully');
          showNotification('Bio updated successfully');
        } else {
          console.error('Failed to update bio');
        }
      } catch (error) {
        console.error('Error updating bio:', error);
      }
    };


    const handleProfilePictureSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
          const response = await fetch('/api/profile/profilePicture', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({ "newProfilePicture": profilePicture }),
          });
    
          if (response.ok) {
            console.log('Profile picture updated successfully');
            setProfileActive(true);
            showNotification('Profile picture updated successfully');
          } else {
            console.error('Failed to update profile picture');
          }
        } catch (error) {
          console.error('Error updating profile picture:', error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen items-center justify-center">
            <div className="absolute top-4 right-4">
                <LinkButton className="bg-fuchsia-300" to="/">Back to main page</LinkButton>
            </div>
            <FormContainer>
                <p className="text-fuchsia-600 h-fit font-extrabold font-montserrat text-2xl">
                    Edit my profile
                </p>
                <div className="mt-6 flex flex-col">
                    <form onSubmit={handleGenderPreferenceSubmit}>
                        <p className="text-fuchsia-600 h-fit text-xl mb-2">
                            Change Gender Preference
                        </p>
                        <label htmlFor="genderPreference" className="mb-2 text-fuchsia-600 w-full">New Gender Preference:</label>
                        <select
                          id="genderPreference"
                          name="genderPreference"
                          value={genderPreferenceMale}
                          onChange={handleGenderPreferenceChange}
                          className="w-full border border-fuchsia-600 p-2 outline-fuchsia-700"
                          required
                        >
                            <option value="" disabled>Select your gender preference</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            </select>
                        <Button type="submit" className="bg-fuchsia-300 mt-4">Save Gender Preference</Button>
                    </form>
                </div>
                <div className="mt-6 flex flex-col">
                    <form onSubmit={handleBioSubmit}>
                        <p className="text-fuchsia-600 h-fit text-xl mb-2">
                          Change Bio
                        </p>
                        <label htmlFor="bio" className="mb-2 text-fuchsia-600 w-full">New Bio:</label>
                        <input
                          className="w-full p-2 border border-fuchsia-600 mt-1"
                          type="bio"
                          id="bio"
                          value={bio}
                          onChange={handleBioChange}
                          maxLength={30}
                          required
                        />
                        <Button type="submit" className="bg-fuchsia-300 mt-4">Save Bio</Button>
                    </form>
                </div>
                <div className="mt-6 flex flex-col">
                    <form onSubmit={handleProfilePictureSubmit}>
                        <p className="text-fuchsia-600 h-fit text-xl mb-2">
                          Change Profile Picture
                        </p>
                        <label htmlFor="profilePicture" className="mb-2 text-fuchsia-600 w-full">New Profile Picture:</label>
                        <input
                          type="file"
                          id="profilePicture"
                          accept="image/*"
                          onChange={handleProfilePictureChange}
                          className="w-full p-2 "
                          required
                        />
                        {profilePicture && (
                          <img
                            src={profilePicture}
                            alt="Profile Picture Preview"
                            className="mt-2 max-w-full h-auto"
                          />
                        )}
                        <Button type="submit" className="bg-fuchsia-300 mt-4">Save Profile Picture</Button>
                    </form>
                </div>
                {!loading && profileActive === false && (
                    <div className="mt-10 bg-red-500 text-white font-semibold rounded-md p-3">
                        <p>NB! To activate your account, you must upload a profile picture.</p>
                </div>
                )}
                {notification && (
                    <div className="mt-4 bg-green-500 text-white font-semibold rounded-md p-3">
                        <p>{notification}</p>
                    </div>
                )}
            </FormContainer>
        </div>
    );
}

export default ProfileEditPage;