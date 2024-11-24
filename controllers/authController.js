const authService = require("../services/authService");

async function signUp(req, res) {
  console.log(req.body);
  try {
    const user = await authService.signUp(req.body);
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

async function refreshToken(req, res) {
  try {
    const { token } = await authService.refreshToken(req.body);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { signUp, signIn, refreshToken };
