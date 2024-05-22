import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import api from "../api";
import { toast } from "react-toastify";
import PasswordToggle from "../components/PasswordToggle";
import "../signUp/_signup.scss";

const Signup = ({ setAuth }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [PasswordInputType, ToggleIcon] = PasswordToggle();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isValidate = () => {
    let isProceed = true;
    let errormessage = "Please enter your";
    if (email == null || email == "") {
      isProceed = false;
      errormessage += " Email";
    }
    if (password == null || password == "") {
      isProceed = false;
      errormessage += " Password";
    }
    if (!isProceed) {
      toast.warning(errormessage);
    }
    return isProceed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValidate()) {
      try {
        const response = await api.post("/auth/register", {
          username,
          email,
          password,
        });
        const { token } = response.data;
        localStorage.setItem("token", token);
        setAuth(true);
        navigate("/");
      } catch (error) {
        console.error(error);
        toast.error("Signup failed. Please check your inputs.");
      }
    }
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
            required
          />
          <span className="password-toggle-icon2">{ToggleIcon}</span>
        </div>
        <div className="signup-btn-container">
          <button type="submit" className="btn btn-primary signup-btn">
            Sign Up
          </button>
        </div>
      </form>
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
