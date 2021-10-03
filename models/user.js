const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
    address: {
      type: String,
    },
    authenticationId: {
      type: String,
    },
    favourites: {
      type: Array,
    },
    paymentDetails: {
      type: String,
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(uniqueValidator, { message: "{PATH} already exist." });

const User = mongoose.model("user", UserSchema);

module.exports = User;
