const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    fullname: {type:String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phonenumber :{type:Number},
    address:{type:String},
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img:{type:String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
