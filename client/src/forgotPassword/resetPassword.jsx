import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
import PasswordToggle from "../components/PasswordToggle";
import "../forgotPassword/_forgotPassword.scss";

const isPasswordValid = (password) => {
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
};

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [PasswordInputType, ToggleIcon] = PasswordToggle();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim() || !confirmPassword.trim()) {
      toast.warning("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!isPasswordValid(password)) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one number and one special character."
      );
      return;
    }

    try {
      const response = await api.post(`/user/reset-password/${token}`, {
        password,
      });
      console.log(response);
      toast.success("Password reset successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Error resetting password");
    }
  };

  return (
    <div className="reset-password-container">
      <h2 className="reset-password-title">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            New Password
          </label>
          <input
            type={PasswordInputType}
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="password-toggle-icon">{ToggleIcon}</span>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="confirmPassword">
            Confirm New Password
          </label>
          <input
            type={PasswordInputType}
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span className="password-toggle-icon">{ToggleIcon}</span>
        </div>
        <button type="submit" className="btn btn-primary reset-password-btn">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
