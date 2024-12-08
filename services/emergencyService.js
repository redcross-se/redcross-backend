const Emergency = require("../models/emergency");
const { setupVoiceCall, createRoom } = require("./voiceCallService");

async function initiateEmergency(data) {
  try {
    const roomId = await createRoom();
    const emergency = await Emergency.create({ ...data, roomId });
    console.log("Emergency created", emergency.dataValues);
    return emergency;
  } catch (error) {
    console.error("Error creating emergency", error);
    throw error;
  }
}

async function updateEmergency(data) {
  await Emergency.update(data, { where: { id: data.id } });
  const updatedEmergency = await Emergency.findByPk(data.id);
  return updatedEmergency;
}

async function acceptEmergency(data) {
  const emergency = await Emergency.update(
    { status: "accepted", responderId: data.responderId },
    { where: { id: data.emergencyId } }
  );
  return emergency;
}

async function dispatchAmbulance(data) {
  console.log("Updating Emergency Dispatch");
  const emergency = await Emergency.update(
    { status: "dispatched", branchId: data.branch.branch_id },
    { where: { id: data.emergencyId } }
  );
  console.log("Emergency Dispatched");
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
