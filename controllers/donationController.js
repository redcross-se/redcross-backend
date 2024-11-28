const donationService = require("../services/donationService");

const donationController = {
  async createDonation(req, res) {
    try {
      const { userId, amount } = req.body;
      if (!userId || !amount) {
        return res.status(400).json({ error: "User ID and amount are required" });
      }
      const donation = await donationService.createDonation({ userId, amount });
      res.status(201).json(donation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllDonations(req, res) {
    try {
      const donations = await donationService.getAllDonations();
      res.status(200).json(donations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUserDonations(req, res) {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
      const donations = await donationService.getUserDonations(userId);
      res.status(200).json(donations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = donationController;
