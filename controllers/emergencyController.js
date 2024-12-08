const {
  initiateEmergency,
  updateEmergency,
  acceptEmergency,
  dispatchAmbulance,
  getAllEmergencies,
  getEmergencyById,
} = require("../services/emergencyService");

function setupSocket(io) {
  const responderPeerMap = {};
  const initiatorPeerMap = {};

  io.on("connection", (socket) => {
    socket.on("registerResponderPeer", ({ peerId, emergencyId }) => {
      responderPeerMap[emergencyId] = peerId;
      console.log(
        `Registered responder peer ID: ${peerId} for emergency: ${emergencyId}`
      );
    });

    socket.on("registerInitiatorPeer", ({ peerId, emergencyId }) => {
      initiatorPeerMap[emergencyId] = peerId;
      console.log(
        `Registered initiator peer ID: ${peerId} for emergency: ${emergencyId}`
      );
    });

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
      console.log("Update emergency to  ", data);
      try {
        const updatedEmergency = await updateEmergency(data);
        console.log("Updated emergency", updatedEmergency.dataValues);
        io.emit("emergencyUpdated", updatedEmergency.dataValues); // Notify all responders
      } catch (error) {
        socket.emit("error", { message: error.message });
      }
    });

    socket.on("acceptEmergency", async (data) => {
      try {
        io.emit("emergencyAccepting", data);
        const emergency = await acceptEmergency(data);
        io.emit("emergencyAccepted", emergency.dataValues); // Notify user and responders

        // Retrieve the responder's peer ID
        const responderPeerId = responderPeerMap[data.emergencyId];
        if (responderPeerId) {
          socket
            .to(data.initiatorSocketId)
            .emit("peerId", { peerId: responderPeerId });
        }
      } catch (error) {
        socket.emit("error", { message: error.message });
      }
    });

    socket.on("dispatchAmbulance", async (data) => {
      try {
        console.log("Dispatch ambulance", data);
        const dispatchInfo = await dispatchAmbulance(data);
        console.log("Dispatch info", dispatchInfo.dataValues);
        io.emit("ambulanceDispatched", {
          emergency: dispatchInfo.dataValues,
          branch: data.branch,
        }); // Notify user
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

    socket.on("getEmergencyById", async (data) => {
      try {
        const emergency = await getEmergencyById(data);
        socket.emit("emergencyById", emergency);
      } catch (error) {
        socket.emit("error", { message: error.message });
      }
    });
  });
}

module.exports = { setupSocket };
