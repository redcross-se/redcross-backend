const { Server } = require("socket.io");

function setupVoiceCall(io) {
  io.on("connection", (socket) => {
    socket.on("joinCall", ({ roomId }) => {
      socket.join(roomId);
      socket.to(roomId).emit("userJoined", { userId: socket.id });
    });

    socket.on("signal", ({ roomId, signalData }) => {
      socket.to(roomId).emit("signal", { userId: socket.id, signalData });
    });

    socket.on("leaveCall", ({ roomId }) => {
      socket.leave(roomId);
      socket.to(roomId).emit("userLeft", { userId: socket.id });
    });
  });
}

module.exports = { setupVoiceCall };
