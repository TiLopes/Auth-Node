const express = require("express");
const router = express.Router(); // criar router
const authController = require("../controllers/authController");
const validatePassword = require("../middleware/validatePassword");
const validatePasswordLeak = require("../middleware/validatePasswordLeak");

router.get("/api/auth/signup", authController.signupGET);
router.post(
  "/api/auth/signup",
  validatePassword,
  validatePasswordLeak,
  authController.signupPOST
);

router.get("/api/auth/login", authController.loginGET);
router.post("/api/auth/login", authController.loginPOST);

// router.get("/api/auth/logout", authController.logout_get);

module.exports = router; // exportar o router
