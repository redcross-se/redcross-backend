const express = require("express");
const userController = require("../controllers/userController");
const authenticateJWT = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.put("/change-password", authenticateJWT, userController.changePassword);
router.put("/update-profile", authenticateJWT, userController.updateProfile);
router.get(
  "/medical-profile",
  authenticateJWT,
  userController.getMedicalProfile
);
router.post(
  "/upload-profile-picture",
  authenticateJWT,
  upload.single("profilePicture"),
  userController.uploadProfilePicture
);

module.exports = router;
