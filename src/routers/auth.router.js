const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.get("/login", authController.login);
router.post("/login", authController.submitLogin);
router.get("/register", authController.register);
router.post("/register", authController.submitRegister);
router.get("/logout", authController.logout);

module.exports = router;
