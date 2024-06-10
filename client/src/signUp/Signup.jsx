import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
import PasswordToggle from "../components/PasswordToggle";
import "../signUp/_signup.scss";
import { FaGoogle, FaGithub, FaGitlab } from "react-icons/fa";

const Signup = ({ setAuth }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [PasswordInputType, ToggleIcon] = PasswordToggle();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isUsernameValid = (username) => {
    return /^[a-zA-Z][a-zA-Z0-9]{2,14}$/.test(username);
  };

  const isEmailValid = (email) => {
    return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
  };

  const isPasswordValid = (password) => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !password.trim()) {
      toast.warning("Please fill in all fields.");
      return;
    }
    if (!isUsernameValid(username)) {
      toast.error(
        "Username must be at least 3-15 characters long and start with a letter. Only letters and numbers are allowed."
      );
      return;
    }
    if (!isEmailValid(email)) {
      toast.error("Invalid email format");
      return;
    }
    if (!isPasswordValid(password)) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one number and one special character."
      );
      return;
    }
    try {
      const response = await api.post("/user/register", {
        username,
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setAuth(true);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Email already registered. Please use a different email.");
      } else {
        console.error(error.message);
      }
    }
  };

  const handleOAuthLogin = (provider) => {
    window.location.href = `${api.defaults.baseURL}/auth/${provider}`;
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type={PasswordInputType}
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="password-toggle-icon2">{ToggleIcon}</span>
        </div>
        <div className="signup-btn-container">
          <button type="submit" className="btn btn-primary signup-btn">
            Sign Up
          </button>
        </div>
      </form>
      <p className="or-text">or sign up with</p>
      <div className="oauth-buttons">
        <button
          className="btn btn-danger oauth-btn"
          onClick={() => handleOAuthLogin("google")}
        >
          <FaGoogle /> Google
        </button>
      </div>
      <p className="form-label text-center mt-3">
        Already have an account?{" "}
        <a href="/login" className="login-link">
          Log in here
        </a>
      </p>
    </div>
  );
};

export default Signup;
