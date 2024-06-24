const express = require("express");
const router = express.Router();
const validInfo = require("../middleware/validInfo");
const authorize = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  verifyToken,
  getAllUsers,
  getUserByUuid,
  updateUser,
  deleteUser,
  getUserDetails,
  forgotPassword,
  resetPassword
} = require("../controllers/users.controller");

//register user
router.post("/register", validInfo, registerUser);

//login user
router.post("/login", validInfo, loginUser);

//user token verify route
router.get("/verify", authorize, verifyToken);

//fetch user details for dashboard
router.get("/dashboard", authorize, getUserDetails);

// Get all users
router.get("/users", getAllUsers);

//forgot password
router.post("/forgot-password", forgotPassword);

//reset password
router.post("/reset-password/:token", resetPassword );


// Get user by UUID with their todo list
router.get("/users/:uuid", getUserByUuid);

// Update user details
router.put("/users/:uuid", updateUser);

// Delete user
router.delete("/users/:uuid", deleteUser);

module.exports = router;
