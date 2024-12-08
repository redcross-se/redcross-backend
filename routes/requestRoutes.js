const express = require("express");
const Request = require("../models/request");

const router = express.Router();

router.post("/add-request", async (req, res) => {
  try {
    const { hospital, bloodTypes, urgency } = req.body;
    const request = await Request.create({ hospital, bloodTypes, urgency });
    res.status(201).json(request);
  } catch (error) {
    console.error("Error adding request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const requests = await Request.findAll();
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
