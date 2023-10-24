const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String, // String is shorthand for {type: String}
    lastname: String,
    email: {
      type: String,
      match: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
    },
    password: String,
    rol: {
      type: String,
      enum: ["ADMIN", "SELLER", "DELIVER"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
