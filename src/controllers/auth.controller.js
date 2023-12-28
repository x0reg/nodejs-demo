const emailValidator = require("email-validator");
const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const saltRounds = 12;
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

authController = {
  login: (req, res) => {
    res.render("auth/login", {
      title: "ĐĂNG NHẬP THÀNH VIÊN",
    });
  },
  register: (req, res) => {
    res.render("auth/register", {
      title: "ĐĂNG KÍ THÀNH VIÊN ",
    });
  },

  submitRegister: async (req, res) => {
    let { email, username, name, password } = req.body;
    if (!email || !username || !name || !password) {
      return res.status(500).json({
        status: "error",
        message: "Vui lòng điền đầy đủ thông tin",
      });
    }
    const validatorEmail = emailValidator.validate(email);
    if (validatorEmail) {
      const checkUsername = await UserModel.findOne({ username: username });
      const checkEmail = await UserModel.findOne({ email: email });
      if (checkUsername) {
        return res.json({
          status: "error",
          message: "Tên đăng nhập đã tồn tại",
        });
      }
      if (checkEmail) {
        return res.json({
          status: "error",
          message: "Email đã có người đăng kí",
        });
      }

      const hashPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new UserModel({
        username,
        email,
        name,
        password: hashPassword,
        ip: req.ip,
        api_token: uuidv4(),
      });
      const saveUser = await newUser.save();
      return res.json({
        status: "success",
        message: "Đăng Kí Tài khoản thành công",
      });
    } else {
      res.json({
        status: "error",
        message: "Email không hợp lệ",
      });
    }
  },
};

module.exports = authController;
