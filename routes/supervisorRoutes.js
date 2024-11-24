const express = require("express");
const supervisorController = require("../controllers/supervisorController");
const authenticateJWT = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/create-volunteer-key",
  authenticateJWT,
  authorizeRoles("supervisor"),
  supervisorController.createVolunteerRegistrationKey
);
router.get(
  "/list-users",
  authenticateJWT,
  authorizeRoles("supervisor"),
  supervisorController.listUsers
);

module.exports = router;
