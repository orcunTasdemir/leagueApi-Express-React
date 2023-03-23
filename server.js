const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const axios = require("axios");
const cors = require("cors");
const adminRouter = require("./routes/adminRoutes");
const userAuth = require("./controllers/userAuth");
const userRouter = require("./routes/userRoutes");
const LeagueApiRouter = require("./routes/api/LeagueApiRoutes");
const AppError = require("./utils/appError");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config.env" });

PORT = 4000;

const corsOptions = {
  origin: [`http://localhost:${PORT}/`, `https://localhost:${PORT}/`],
  exposedHeaders: ["set-cookie", "Dogola"],
  credentials: true,
};
const app = express();

const DB = process.env.DATABASE.replace(
  "<DATABASE_PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

app.use("/api/admin", adminRouter);
app.use("/api/users", userRouter);
app.use("/api/lol", LeagueApiRouter);
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to bezkoder application. Possible routes into the application are as follows: ",
    message2:
      "for some other routes you need to be logged in, visit /login or /signup to join the website!",
    allroutes: [
      "/api/lol/allchampions",
      "/api/lol/past5games",
      "/api/lol/accountinfo",
      "/api/lol/allitems",
      "/api/lol/ladder",
    ],
  });
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.listen(4000, () => {
  console.log(`The server is listening on port ${PORT}!`);
});
