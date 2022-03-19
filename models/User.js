const mongoose = require("mongoose");
const validators = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: validators.isEmail,
      massage: "Invalid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  address: {
    street: String,
    city: String,
    country: String,
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

module.exports = mongoose.model("User", userSchema);
