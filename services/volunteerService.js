const User = require("../models/user");

async function getUser(id) {
  console.log("Getting user", id);
  return await User.findByPk(id);
}

module.exports = { getUser };
