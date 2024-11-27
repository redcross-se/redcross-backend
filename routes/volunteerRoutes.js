const express = require("express");
const volunteerController = require("../controllers/volunteerController");
const authenticateJWT = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

//Route is only accessible to volunteers, supervisors and admins

router.get("/user/:id", authenticateJWT, volunteerController.getUser);

module.exports = router;
