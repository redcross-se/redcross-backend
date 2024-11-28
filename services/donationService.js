const Donation = require("../models/Donations");
const User = require("../models/user");

const donationService = {
  async createDonation(donationData) {
    const user = await User.findByPk(donationData.userId);
    if (!user) {
      throw new Error("User not found");
    }
    return await Donation.create(donationData);
  },

  async getAllDonations() {
    return await Donation.findAll({
      include: [{ model: User, attributes: ["id", "fullName", "email"] }],
    });
  },

  async getUserDonations(userId) {
    return await Donation.findAll({
      where: { userId },
      include: [{ model: User, attributes: ["id", "fullName", "email"] }],
    });
  },
};

module.exports = donationService;
