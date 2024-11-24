const RegistrationKey = require("../models/registrationKey");
const { v4: uuidv4 } = require("uuid");

async function createRegistrationKey(role) {
  if (!["supervisor", "volunteer"].includes(role)) {
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

module.exports = { createRegistrationKey };
