const RegistrationKey = require("../models/registrationKey");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");

async function createVolunteerRegistrationKey(role) {
  if (!"volunteer".includes(role)) {
    throw new Error("Invalid role for registration key");
  }

  const key = uuidv4();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const registrationKey = await RegistrationKey.create({
    key,
    role,
    expiresAt,
  });

  return registrationKey;
}

async function listUsers() {
  return await User.findAll();
}

module.exports = { createVolunteerRegistrationKey, listUsers };
