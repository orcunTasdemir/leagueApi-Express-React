// user authentication
const jwt = require("jsonwebtoken");

exports.verify = (req, res, next) => {
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

exports.verify2 = function (req, res, next) {
  console.log(req.cookies);
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};

// module.exports = verify;
