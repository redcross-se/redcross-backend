const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.post("/refresh", authController.refreshToken);
router.get("/me", authController.me);

module.exports = router;
