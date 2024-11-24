const Emergency = require("../models/emergency");
const { setupVoiceCall } = require("./voiceCallService");

async function initiateEmergency(data) {
  const emergency = await Emergency.create(data);
  return emergency;
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

module.exports = {
  initiateEmergency,
  updateEmergency,
  acceptEmergency,
  dispatchAmbulance,
};
