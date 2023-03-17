// user authentication
const jwt = require("jsonwebtoken");

exports.verify = (req, res, next) => {
  //Sconsole.log("request: ", req.user.role);
  // console.log(res.user.role);
  // why does this error happen I dont gwt it?
  // above line doesnt work sometimes because request.user does not persist I guess
  console.log("Cookie arrives in verify: " + req.cookies.token);
  const authHeader = req.headers.authorizSation;

  if (req.cookies.token) {
    //this is where the token is
    const token = req.cookies.token;
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
  //commented out after trying for the req.cookies
  // if (authHeader) {
  //   //this is where the token is

  //   const token = authHeader.split(" ")[1];
  //   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
  //     if (err) {
  //       res.status(403).json("Json token is not valid >:(");
  //     } else {
  //       req.user = user;
  //       next();
  //     }
  //   });
  // } else {
  //   res.status(401).json({ message: "You are not authenticated!" });
  // }
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
