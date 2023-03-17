const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/UserModel");
const auth = require("../controllers/userAuth");

let refreshTokens = [];

const generateAccessToken = (user) => {
  const payload = { id: user._id, role: user.role };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1hr",
  });
};
const generateRefreshToken = (user) => {
  const payload = { id: user._id, role: user.role };
  return jwt.sign(payload, process.env.JWT_SECRET);
};

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "Internal error please try again:(" + err });
    } else if (!user) {
      res.status(401).json({ error: "Incorrect email or password" });
    } else {
      user.isCorrectPassword(password, (err, same) => {
        if (err) {
          res
            .status(500)
            .json({ error: "Internal error please try again:(" + err });
        } else if (!same) {
          res.status(401).json({ error: "Incorrect email or password" });
        } else {
          const token = generateAccessToken(user);
          const refreshToken = generateRefreshToken(user);
          refreshTokens.push(refreshToken);

          console.log("Authentication is complete!");
          console.log("the token is: ", token);

          res
            // .header("Access-Control-Allow-Credentials", "true")
            .cookie("token", token, {
              httpOnly: false,
              secure: false,
            });
          res.json({
            message: "success",
          });
        }
      });
    }
  });
});

router.post("/refresh", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return res.status(401).json("You are not authenticated");
  }
  if (!refreshTokens.includes(refreshToken)) {
    return res.status().json("Refresh token is not valid");
  }
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    refreshTokens.push(newRefreshToken);

    res.status(200).json({ newToken: newToken, refreshToken: newRefreshToken });
  });
});

router.post("/logout", auth.verify, (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("You logged out successfully!");
});

// post route to register new user
router.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;
  const document = new User({ email, username, password });
  console.log(document);

  document.save((err) => {
    if (err) {
      res
        .status(500)
        .send("Error registering new user please try again!" + err);
    } else {
      res.status(200).send("Welcome to the League of Legends Api");
    }
  });
});

router.delete("/:userId", auth.verify, async (req, res) => {
  console.log("user id: " + req.params.userId);
  if (req.user._id === req.params.userId || req.user.role === "admin") {
    const userToDelete = await User.findOne({
      _id: req.params.userId,
    }).remove();
    res.status(200).json("user is deleted");
  } else {
    res.status(403).json("You are not allowed to delete this user!");
  }
});

module.exports = router;
