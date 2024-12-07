const express = require("express");
const Request = require("../models/request");

const router = express.Router();

router.post("/add-request", async (req, res) => {
  const { hospital, bloodTypes, urgency } = req.body;
  const request = await Request.create({ hospital, bloodTypes, urgency });
  res.status(201).json(request);
});

router.get("/requests", async (req, res) => {
  const requests = await Request.findAll();
  res.status(200).json(requests);
});

module.exports = router;
