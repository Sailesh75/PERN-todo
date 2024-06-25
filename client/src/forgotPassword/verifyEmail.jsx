import React, { useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import "../forgotPassword/_forgotPassword.scss";

const verifyEmail = ({}) => {
  const [email, setEmail] = useState("");

  const isEmailValid = (email) => {
    return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.warning("Empty field.");
      return;
    }
    if (!isEmailValid(email)) {
      toast.error("Invalid email format");
      return;
    }
    try {
      const response = await api.post("/user/forgot-password", { email });
      console.log(response);
      if (response.status == 400) {
        toast.error("User doesn't exits!");
      }
      toast.success("Password reset email sent");
    } catch (error) {
      toast.error("Error sending password reset link");
    }
  };

  return (
    <div className="verify-email-container">
      <h2 className="verify-email-title">Verify your Email</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary verify-email-btn">
          Send
        </button>
      </form>
    </div>
  );
};

export default verifyEmail;
