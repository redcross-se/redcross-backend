function handleWebRTCSignal(data, socket) {
  const { to, signal } = data;
  socket.to(to).emit("webrtcSignal", { from: socket.id, signal });
}

module.exports = { handleWebRTCSignal };
