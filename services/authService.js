const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const RegistrationKey = require("../models/registrationKey");
const authConfig = require("../configs/authConfig");

async function signUp({
  fullName,
  email,
  phoneNumber,
  password,
  role,
  registrationKey,
}) {
  if (role !== "user" && !registrationKey) {
    throw new Error("Registration key is required for non-user roles");
  }

  if (registrationKey) {
    const key = await RegistrationKey.findOne({
      where: { key: registrationKey, isUsed: false },
    });
    if (!key || key.role !== role) {
      throw new Error("Invalid or expired registration key");
    }
    await key.update({ isUsed: true });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    fullName,
    email,
    phoneNumber,
    password: hashedPassword,
    role,
  });
  return user;
}

async function signIn({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign(
    { id: user.id, role: user.role },
    authConfig.jwtSecret,
    { expiresIn: "1h" }
  );
  const refreshToken = jwt.sign(
    { id: user.id, role: user.role },
    authConfig.jwtSecret,
    { expiresIn: "7d" }
  );
  return { user, token, refreshToken };
}

async function refreshToken({ refreshToken }) {
  const decoded = jwt.verify(refreshToken, authConfig.jwtSecret);
  const user = await User.findByPk(decoded.id);
  const newToken = jwt.sign(
    { id: user.id, role: user.role },
    authConfig.jwtSecret,
    { expiresIn: "1h" }
  );

  return newToken;
}

async function findUserByToken(token) {
  const decoded = jwt.verify(token, authConfig.jwtSecret);
  const user = await User.findByPk(decoded.id);
  return user;
}

module.exports = { signUp, signIn, refreshToken, findUserByToken };
