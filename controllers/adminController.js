const adminService = require("../services/adminService");

async function createSupervisorRegistrationKey(req, res) {
  try {
    const registrationKey = await adminService.createRegistrationKey(
      req.body.role
    );
    res.status(201).json(registrationKey);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { createSupervisorRegistrationKey };
