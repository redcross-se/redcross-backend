const express = require("express");
const donationController = require("../controllers/donationController");

const router = express.Router();


router.post("/donate", donationController.createDonation);
router.get("/donations", donationController.getAllDonations);
router.get("/donations/user/:userId", donationController.getUserDonations);

module.exports = router;



