import React from "react";
import Button from "../components/Button";
import '../styles/App.css';

const LandingPage: React.FC = () => {

    return (
        <div className="button-container">
            <Button to="/login" className="rounded-button" style={{ background: '#783F8E', color: '#C8C6D7' }}>Login</Button>
            <Button to="/register" className="rounded-button" style={{ background: '#783F8E', color: '#C8C6D7' }}>Register</Button>
        </div>
      );
};

export default LandingPage;