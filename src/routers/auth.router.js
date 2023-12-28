const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.get("/login", authController.login);
router.get("/register", authController.register);
router.post("/register", authController.submitRegister);

module.exports = router;
