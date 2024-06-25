import React, { useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import "../forgotPassword/_forgotPassword.scss";

const resetPassword = ({}) => {
  const [newPassword, setNewPassword] = useState("");
  const location = useLocation();
  const history = useHistory();

  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/user/reset-password/${token}`, { newPassword });
      toast.success("Password has been reset");
      history.push("/login");
    } catch (error) {
      toast.error("Error resetting password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default resetPassword;
