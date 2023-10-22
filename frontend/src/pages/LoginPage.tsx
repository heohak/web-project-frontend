import LoginContainer from '@/components/LoginContainer';
import Button from '@/components/Button';
import React from 'react';

const LoginPage: React.FC = () => {
    return (
        <>
        <div className="fixed top-10 right-10">
            <Button to="/register" className="bg-fuchsia-300">Sign Up</Button>
        </div>
        <div className="flex h-screen w-screen place-items-center place-content-center">
            <LoginContainer>
                <p className="text-fuchsia-600 h-fit font-extrabold font-montserrat text-2xl">
                    Log in to TalDate
                </p>

                <div className="mt-6 flex flex-col">
                    <label htmlFor="emailInput" className="mb-2 text-fuchsia-600">
                        Email
                    </label>
                    <input
                        type="email"
                        id="emailInput"
                        name="email"
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
                        className="w-full border border-fuchsia-600 p-2 outline-fuchsia-700"
                        required
                    />
                </div>

                <Button to="/main" className="mt-10 bg-fuchsia-300 w-max">
                    Log In
                </Button>
            </LoginContainer>
        </div>
        </>
    )
}

export default LoginPage;