const userService = require("../services/userService");

async function changePassword(req, res) {
  try {
    await userService.changePassword(req.user.id, req.body.newPassword);
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateProfile(req, res) {
  try {
    await userService.updateProfile(req.user.id, req.body);
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getMedicalProfile(req, res) {
  try {
    const profile = await userService.getMedicalProfile(req.user.id);
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function uploadProfilePicture(req, res) {
  try {
    const profilePictureUrl = `/uploads/${req.file.filename}`; // Assuming file is uploaded to /uploads
    await userService.uploadProfilePicture(req.user.id, profilePictureUrl);
    res.status(200).json({ profilePictureUrl });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function initiateEmergency(req, res) {
  try {
    const emergencyData = {
      userId: req.user.id,
      location: req.body.location,
      type: req.body.type,
      additionalInfo: req.body.additionalInfo,
    };
    req.app.get("io").emit("newEmergency", emergencyData);
    res.status(200).json({ message: "Emergency initiated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  changePassword,
  updateProfile,
  getMedicalProfile,
  uploadProfilePicture,
  initiateEmergency,
};
