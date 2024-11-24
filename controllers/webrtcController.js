const { handleWebRTCSignal } = require("../services/webrtcService");

function setupWebRTC(io) {
  io.on("connection", (socket) => {
    socket.on("webrtcSignal", (data) => {
      handleWebRTCSignal(data, socket);
    });
  });
}

module.exports = { setupWebRTC };
