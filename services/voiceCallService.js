const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");

function setupVoiceCall(io) {
  // io.on("connection", (socket) => {
  //   console.log("a user connected");
  //   socket.on("disconnect", () => {
  //     console.log("user disconnected");
  //   });
  //   socket.on("call-user", (data) => {
  //     console.log(`call-user event from ${data.callerID} to ${data.userID}`);
  //     socket.to(data.userID).emit("call-made", {
  //       offer: data.offer,
  //       callerID: data.callerID,
  //     });
  //   });
  //   socket.on("answer-made", (data) => {
  //     console.log(
  //       `answer-made event from ${data.calleeID} to ${data.callerID}`
  //     );
  //     socket.to(data.callerID).emit("answer-made", {
  //       answer: data.answer,
  //       calleeID: data.calleeID,
  //     });
  //   });
  //   socket.on("user-connected", (userID) => {
  //     console.log(`user-connected event for ${userID}`);
  //     socket.broadcast.emit("user-connected", userID);
  //   });
  //   socket.on("user-disconnected", (userID) => {
  //     console.log(`user-disconnected event for ${userID}`);
  //     socket.broadcast.emit("user-disconnected", userID);
  //   });
  // });
}

async function createRoom() {
  const roomId = uuidv4();
  return roomId;
}

module.exports = { setupVoiceCall, createRoom };
