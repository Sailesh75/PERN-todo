import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
import "../forgotPassword/_forgotPassword.scss";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await api.post(`/user/reset-password/${token}`, {
        password,
      });
      toast.success(response.data.message);
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
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary reset-password-btn">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
