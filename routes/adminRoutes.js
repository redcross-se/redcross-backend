const express = require("express");
const adminController = require("../controllers/adminController");
const authenticateJWT = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/create-supervisor-key",
  authenticateJWT,
  authorizeRoles("admin"),
  adminController.createSupervisorRegistrationKey
);

module.exports = router;
