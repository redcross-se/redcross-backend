const bcrypt = require("bcryptjs");
const User = require("../models/user");

async function changePassword(userId, newPassword) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.update({ password: hashedPassword }, { where: { id: userId } });
}

async function updateProfile(userId, profileData) {
  await User.update(profileData, { where: { id: userId } });
}

async function getMedicalProfile(userId) {
  return await User.findOne({
    where: { id: userId },
    attributes: [
      "dob",
      "bloodType",
      "weight",
      "height",
      "allergies",
      "emergencyContacts",
    ],
  });
}

async function uploadProfilePicture(userId, profilePictureUrl) {
  await User.update(
    { profilePicture: profilePictureUrl },
    { where: { id: userId } }
  );
}

module.exports = {
  changePassword,
  updateProfile,
  getMedicalProfile,
  uploadProfilePicture,
};
