import LoginContainer from '@/components/FormContainer';
import Button from '@/components/Button';
import LinkButton from '@/components/LinkButton';

import * as React from "react";
import {useState} from "react";
import { useNavigate } from "react-router-dom";




const LoginPage: React.FC = () => {
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Form submitted:', formData);
        
        navigate('/main');
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
