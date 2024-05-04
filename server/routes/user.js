const express = require("express");
const router = express.Router();
const { User } = require("../models");

//register a User
router.post("/users", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUSer = await User.create({ username, email, password });
    res.status(200).json(newUSer);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//login a User
// router.post("/users", async(req,res)=>{
//   try{
//     const {email, password} = req.body;

//   }catch(error){
//     console.error(error);
//     res.status(500).json(error);
//   }
// })

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

//get One user along with their todos
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
