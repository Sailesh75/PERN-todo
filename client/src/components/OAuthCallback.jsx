import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = ({ setAuth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    const token = urlParams.get("token");
    console.log(token);

    if (token) {
      localStorage.setItem("token", token);
      setAuth(true);
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate, setAuth]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default AuthCallback;
