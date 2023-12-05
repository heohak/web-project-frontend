import * as React from "react";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  localStorage.clear();

  useEffect(() => {
    navigate("/login");
  }, []);

  return <></>
}

export default LogoutPage;