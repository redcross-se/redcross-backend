const supervisorService = require("../services/supervisorService");

async function createVolunteerRegistrationKey(req, res) {
  try {
    const registrationKey =
      await supervisorService.createVolunteerRegistrationKey("volunteer");
    res.status(201).json(registrationKey);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function listUsers(req, res) {
  try {
    const users = await supervisorService.listUsers();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { createVolunteerRegistrationKey, listUsers };
