const express = require("express");
const session = require("express-session");
const sequelize = require("./models");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const supervisorRoutes = require("./routes/supervisorRoutes");
const passport = require("passport");
require("./configs/passportConfig");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const { setupSocket } = require("./controllers/emergencyController");
const { setupVoiceCall } = require("./services/voiceCallService");
const app = express();

app.use(express.json());

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/supervisor", supervisorRoutes);
app.use("/user", userRoutes);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
console.log("Socket.io server is running on port 3000");
setupSocket(io);
setupVoiceCall(io);

sequelize.sync().then(() => {
  server.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
