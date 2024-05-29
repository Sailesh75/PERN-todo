const { User } = require("../models");
const jwtGenerator = require("../utils/jwtGenerator");

// Register user
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists. Please try a different email.",
      });
    }
    const newUser = await User.create({ username, email, password });
    const token = jwtGenerator(newUser);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ msg: "Bad request: User doesn't exist!" });
    }
    const isPasswordCorrect = await User.comparePassword(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ msg: "Unauthorized: Invalid email or password" });
    }
    const token = jwtGenerator(user);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

// Verify token
const verifyToken = async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

//get user details
const getUserDetails = async (req, res) => {
  try {
    //req.user has the payload
    // res.json(req.user);
    const user = await User.findOne({ where: { uuid: req.user } });
    res.status(200).json({ username: user.username, uuid: user.uuid });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

// Get user by UUID
const getUserByUuid = async (req, res) => {
  try {
    const { uuid } = req.params;
    const user = await User.findOne({
      where: { uuid },
      include: "todos",
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { uuid } = req.params;
    const { username, email } = req.body;
    await User.update(
      {
        username,
        email,
      },
      {
        where: { uuid },
      }
    );
    res.status(200).json({ msg: "User details updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { uuid } = req.params;
    await User.destroy({
      where: { uuid },
    });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting data" });
    console.error(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyToken,
  getAllUsers,
  getUserByUuid,
  updateUser,
  deleteUser,
  getUserDetails
};
