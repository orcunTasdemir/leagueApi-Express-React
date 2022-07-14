// User.js
const mongoose = require("mongoose");
// for hashing the passwords
const bcrypt = require("bcrypt");

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin", "half-admin"],
    default: "user",
  },
});

UserSchema.pre("save", function (next) {
  // check whether the user is new or the password is being changed
  if (this.isNew || this.isModified("password")) {
    // saving reference because of changing scopes
    console.log(this);
    const document = this;
    bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  }
});

UserSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

module.exports = mongoose.model("User", UserSchema);

// const Users = mongoose.model("User", UserSchema);

// module.exports = Users;
