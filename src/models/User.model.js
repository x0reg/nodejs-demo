const mongose = require("mongoose");

const Users = new mongose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
      integer: true,
    },
    role: {
      type: String,
      default: "user",
    },
    ip: String,
    api_token: String,
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const UserModel = mongose.model("Users", Users);

module.exports = UserModel;
