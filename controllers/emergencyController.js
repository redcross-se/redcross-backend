const {
  initiateEmergency,
  updateEmergency,
  acceptEmergency,
  dispatchAmbulance,
  getAllEmergencies,
  getEmergencyById,
} = require("../services/emergencyService");

function setupSocket(io) {
  io.on("connection", (socket) => {
    console.log("New client connected", socket.id);

    socket.on("initiateEmergency", async (data) => {
      console.log("Initiate emergency", data);
      try {
        const emergency = await initiateEmergency(data);
        io.emit("newEmergency", emergency); // Notify all responders
      } catch (error) {
        socket.emit("error", { message: error.message });
      }
    });

    socket.on("updateEmergency", async (data) => {
      try {
        const updatedEmergency = await updateEmergency(data);
        io.emit("emergencyUpdated", updatedEmergency); // Notify all responders
      } catch (error) {
        socket.emit("error", { message: error.message });
      }
    });

    socket.on("acceptEmergency", async (data) => {
      try {
        const emergency = await acceptEmergency(data);
        io.emit("emergencyAccepted", emergency); // Notify user and responders
        io.to(data.roomId).emit("startVoiceCall", { roomId: data.roomId });
      } catch (error) {
        socket.emit("error", { message: error.message });
      }
    });

    socket.on("dispatchAmbulance", async (data) => {
      try {
        const dispatchInfo = await dispatchAmbulance(data);
        io.emit("ambulanceDispatched", dispatchInfo); // Notify user
      } catch (error) {
        socket.emit("error", { message: error.message });
      }
    });

    socket.on("getAllEmergencies", async () => {
      try {
        const emergencies = await getAllEmergencies();
        socket.emit("allEmergencies", emergencies);
      } catch (error) {
        socket.emit("error", { message: error.message });
      }
    });
  });
}

module.exports = { setupSocket };
