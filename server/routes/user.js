const express = require("express");
const router = express.Router();
const { User, Todo } = require("../models");


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

//get a user along with their todos
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

//update user detail

//delete user detail

module.exports = router;
