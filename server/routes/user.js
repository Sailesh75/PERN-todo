const express = require("express");
const router = express.Router();
const { User } = require("../models");

//get all Users
router.get("/users", async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//get a user with their todos
router.get("/users/:uuid", async (req, res) => {
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
});

//update user detail(username,email)
router.put("/users/:uuid", async (req, res) => {
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
});

//delete user detail
router.delete("/users/:uuid", async (req, res) => {
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
});

module.exports = router;
