const express = require("express");
const session = require("express-session");
const sequelize = require("./models");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const supervisorRoutes = require("./routes/supervisorRoutes");
const branchesRoutes = require("./routes/BranchesRoutes");
const applicantsRoutes = require("./routes/applicationsRoutes");
const donationRoutes = require("./routes/donationRoutes");
const passport = require("passport");
require("./configs/passportConfig");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const volunteerRoutes = require("./routes/volunteerRoutes");
const { setupSocket } = require("./controllers/emergencyController");
const { setupVoiceCall } = require("./services/voiceCallService");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

app.use(express.json());

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/supervisor", supervisorRoutes);
app.use("/user", userRoutes);
app.use("/volunteer", volunteerRoutes);
app.use("/branches", branchesRoutes);
app.use("/applicants", applicantsRoutes);
app.use("/donations", donationRoutes);

app.use(passport.initialize());
app.use(passport.session());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
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