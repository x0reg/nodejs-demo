const validator = require("validator");
const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const saltRounds = 12;
const { v4: uuidv4 } = require("uuid");
const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-\s]/g;

authController = {
  login: (req, res) => {
    res.render("auth/login", {
      title: "ĐĂNG NHẬP THÀNH VIÊN",
    });
  },
  submitLogin: async (req, res) => {
    let { username, password } = req.body;
    if (!username || !password) {
      return res.status(500).json({
        status: "error",
        message: "Vui lòng điền đầy đủ thông tin",
      });
    }
    checkUser = await UserModel.findOne({ username });
    if (checkUser) {
      checkPasword = await bcrypt.compare(password, checkUser.password);
      if (checkPasword) {
        const access_token = JWT.sign(
          {
            id: checkUser._id,
            username: username,
          },
          process.env.SECRET_JWT,
          {
            expiresIn: "7d",
          }
        );
        await UserModel.findOneAndUpdate(
          { username },
          { $set: { ip: req.ip } }
        );
        return res
          .cookie("access_token", access_token, {
            httpOnly: true,
          })
          .json({
            status: "success",
            message: "Đăng nhập thành công",
          });
      } else {
        return res.status(500).json({
          status: "error",
          message: "Thông tin đăng nhập chưa chính xác",
        });
      }
    } else {
      return res.status(500).json({
        status: "error",
        message: "Tên tài khoản không tồn tại",
      });
    }
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
    const validatorEmail = validator.isEmail(email);
    const validateUsername = validator.isAlphanumeric(username);
    if (!validateUsername) {
      return res.json({
        status: "error",
        message: "Tên đăng nhập viết liền không dấu và không có kí tự đặc biệt",
      });
    }
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
        username: username.replace(regex, ""),
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

  logout: async (req, res) => {
    res.clearCookie("access_token");
    return res.redirect("/");
  },
};

module.exports = authController;
