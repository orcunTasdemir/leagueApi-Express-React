const express = require("express");
const userAuth = require("../controllers/userAuth");
const router = express.Router();
const User = require("../models/UserModel");
const verify = require("../controllers/userAuth");

router.get("/users", verify, async (req, res) => {
  console.log(req.cookies.token);
  const allUsers = await User.find();
  res.status(200).json(allUsers);
});

router.get("/allUsers", verify, async (req, res) => {
  //userAuth
  console.log(req.headers);
  const allUsers = await User.find();
  res.status(200).json(allUsers);
});

module.exports = router;
