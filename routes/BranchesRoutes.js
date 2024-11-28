const express = require('express');
const branchController = require('../controllers/branchController');

const router = express.Router();

// Define routes
router.get('/branches', branchController.getAllBranches);
router.post('/add-branch', branchController.addBranch);
router.put('/edit-branch/:id', branchController.editBranch);
router.get('/branch/:id', branchController.getBranch); // Ensure this is defined and matches the controller function

module.exports = router;
