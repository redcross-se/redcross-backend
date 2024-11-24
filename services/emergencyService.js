const Emergency = require("../models/emergency");
const { setupVoiceCall } = require("./voiceCallService");

async function initiateEmergency(data) {
  try {
    const emergency = await Emergency.create(data);
    console.log("Emergency created", emergency);
    return emergency;
  } catch (error) {
    console.error("Error creating emergency", error);
    throw error;
  }
}

async function updateEmergency(data) {
  const emergency = await Emergency.update(data, { where: { id: data.id } });
  return emergency;
}

async function acceptEmergency(data) {
  const emergency = await Emergency.update(
    { status: "accepted", responderId: data.responderId },
    { where: { id: data.id } }
  );
  setupVoiceCall(data.roomId);
  return emergency;
}

async function dispatchAmbulance(data) {
  const emergency = await Emergency.update(
    { status: "dispatched", branchId: data.branchId },
    { where: { id: data.id } }
  );
  return emergency;
}

async function getAllEmergencies() {
  const emergencies = await Emergency.findAll();
  return emergencies;
}

async function getEmergencyById(id) {
  const emergency = await Emergency.findByPk(id);
  return emergency;
}

module.exports = {
  initiateEmergency,
  updateEmergency,
  acceptEmergency,
  dispatchAmbulance,
  getAllEmergencies,
  getEmergencyById,
};
