import LoginContainer from '@/components/FormContainer';
import Button from '@/components/Button';
import LinkButton from '@/components/LinkButton';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '@/styles/upload-button.css';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        dateOfBirth: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    dateOfBirth: new Date(formData.dateOfBirth).toISOString().split('T')[0],
                    isGenderMale: formData.gender === 'male'
                }),
            });

            // If there's no content, the JSON parsing is skipped
            if (response.ok) {
                console.log('Registration successful');
                navigate('/login');
            } else {
                // Handle server-side validation errors
                const error = await response.json();
                if (error.error) {
                    alert(error.error);
                }
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };





    return (
        <>
            <div className="absolute top-10 right-10">
                <LinkButton to="/login" className="bg-fuchsia-300">Log In</LinkButton>
            </div>
            <div className="flex flex-col min-h-screen items-center justify-center">
                <LoginContainer>
                    <p className="text-fuchsia-600 h-fit font-extrabold font-montserrat text-2xl">
                        Sign up for TalDate
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="mt-6 flex flex-col">
                            <label htmlFor="firstNameInput" className="mb-2 text-fuchsia-600">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstNameInput"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full border border-fuchsia-600 p-2 outline-fuchsia-700"
                                required
                            />
                        </div>

                        <div className="mt-6 flex flex-col">
                            <label htmlFor="lastNameInput" className="mb-2 text-fuchsia-600">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastNameInput"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full border border-fuchsia-600 p-2 outline-fuchsia-700"
                                required
                            />
                        </div>

                        <div className="mt-6 flex flex-col">
                            <label htmlFor="emailInput" className="mb-2 text-fuchsia-600">
                                Email
                            </label>
                            <input
                                type="email"
                                id="emailInput"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-fuchsia-600 p-2 outline-fuchsia-700"
                                required
                            />
                        </div>

                        <div className="mt-6 flex flex-col">
                            <label htmlFor="passwordInput" className="mb-2 text-fuchsia-600">
                                Password
                            </label>
                            <input
                                type="password"
                                id="passwordInput"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border border-fuchsia-600 p-2 outline-fuchsia-700"
                                required
                            />
                        </div>

                        <div className="mt-6 flex flex-col">
                            <label htmlFor="passwordInput" className="mb-2 text-fuchsia-600">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPasswordInput"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full border border-fuchsia-600 p-2 outline-fuchsia-700"
                                required
                            />
                        </div>

                        <div className="mt-6 flex flex-col">
                            <label htmlFor="genderSelect" className="mb-2 text-fuchsia-600">
                                Gender
                            </label>
                            <select
                                id="genderSelect"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full border border-fuchsia-600 p-2 outline-fuchsia-700"
                                required
                            >
                                <option value="" disabled>Select your gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>



                        <div className="mt-6 flex flex-col">
                            <label htmlFor="dobInput" className="mb-2 text-fuchsia-600">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                id="dobInput"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className="w-full border border-fuchsia-600 p-2 outline-fuchsia-700"
                                required
                            />
                        </div>

                        <Button type="submit" className="mt-10 bg-fuchsia-300 w-max">
                            Sign Up
                        </Button>
                    </form>
                </LoginContainer>
            </div>
        </>
    )
}

export default RegisterPage;
