import LoginContainer from '@/components/FormContainer';
import Button from '@/components/Button';
import LinkButton from '@/components/LinkButton';

import * as React from "react";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

import '@/styles/scrollbar.css';


const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [kanyeQuote, setKanyeQuote] = useState('');

    const fetchKanyeQuote = async () => {
        try {
            const response = await fetch('/api/quote');
            const data = await response.json();
            setKanyeQuote(data.quote);
        } catch (error) {
            console.error('Error fetching Kanye quote:', error);
        }
    };

    useEffect(() => {
        fetchKanyeQuote();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                console.log("login successful");
                const token = await response.json();
                if (token) {
                    localStorage.setItem("token", token.token);

                    const profileResponse = await fetch('/api/profile', {
                        method: 'GET',
                        headers: {'Authorization': 'Bearer ' + localStorage.getItem("token")}
                    })

                    const profileData = await profileResponse.json();

                    if (profileData.profileActive) {
                        navigate('/');
                    } else {
                        navigate('/profile/edit');
                    } 
                }
            } else {
                // If the login fails, parse the error message and show it in an alert
                const error = await response.json();
                if (error.message) {
                    alert(error.message);
                } else {
                    alert('An unknown error occurred. Please try again.');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('There was a network error. Please try again.');
        }
    }


    return (
        <>
            <div className="absolute top-10 right-10">
                <LinkButton to="/register" className="bg-fuchsia-300">Sign Up</LinkButton>
            </div>
            <div className="flex flex-col min-h-screen items-center justify-center">
                <LoginContainer>
                    <p className="text-fuchsia-600 h-fit font-extrabold font-montserrat text-2xl">
                        Log in to TalDate
                    </p>

                    {kanyeQuote && (
                        <div className="max-h-24 overflow-y-auto my-4 min-h-fit">
                            <p className="text-center text-fuchsia-500 italic px-1">
                                "{kanyeQuote}"
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
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

                        <Button type="submit" className="mt-10 bg-fuchsia-300 w-max">
                            Log In
                        </Button>
                    </form>
                </LoginContainer>
            </div>
        </>
    )
}

export default LoginPage;
