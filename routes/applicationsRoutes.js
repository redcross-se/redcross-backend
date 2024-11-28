const express = require('express');
const applicationController = require('../controllers/applicationController');

const router = express.Router();

// Define routes
router.get('/applications', applicationController.getApplications);
router.post('/add-application', applicationController.addApplication);
router.put('/applications/:id/status', applicationController.updateApplicationStatus);



module.exports = router;
