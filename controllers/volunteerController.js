const authService = require("../services/authService");

async function signUp(req, res) {
  try {
    const user = await authService.signUp({ ...req.body, role: "volunteer" });
    //user must have provided a registration key
    if (!req.body.registrationKey) {
      throw new Error("Registration key is required");
    }
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function signIn(req, res) {
  try {
    const { user, token } = await authService.signIn(req.body);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function acceptEmergency(req, res) {
  try {
    const emergency = await emergencyService.acceptEmergency(req.body);
    res.json(emergency);
    req.app.get("io").emit("emergencyAccepted", emergency);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { signUp, signIn };
