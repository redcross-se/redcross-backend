const authService = require("../services/authService");
const { StreamChat } = require("stream-chat");

const client = StreamChat.getInstance(
  "3pkfpxv4cver",
  "bfeftk6mfesz2zf9przch2ay9fvfanefgqd463p8m3y5zdkemjppcenyf4r9m89c"
);

async function signUp(req, res) {
  try {
    const user = await authService.signUp(req.body);
    await client.upsertUser({
      id: user.dataValues.id.toString(),
      name: user.dataValues.fullName,
      email: user.dataValues.email,
    });
    const token = client.createToken(user.dataValues.id.toString());
    res.status(201).json({ user, streamToken: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function signIn(req, res) {
  try {
    const { user, token, refreshToken } = await authService.signIn(req.body);
    const streamToken = client.createToken(user.dataValues.id.toString());
    res.json({ user, token, refreshToken, streamToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function refreshToken(req, res) {
  try {
    const token = await authService.refreshToken(req.body);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function me(req, res) {
  //find user from token
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  console.log(req.headers.authorization);
  const user = await authService.findUserByToken(
    req.headers.authorization.split(" ")[1]
  );
  res.json(user);
}

module.exports = { signUp, signIn, refreshToken, me };
