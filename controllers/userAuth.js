// user authentication
const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    //this is where the token is

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(403).json("Json token is not valid >:(");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};

module.exports = verify;
