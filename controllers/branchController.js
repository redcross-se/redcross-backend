const branchService = require('../services/branchService');

const branchController = {
  async getAllBranches(req, res) {
    try {
      const branches = await branchService.getAllBranches();
      res.status(200).json(branches);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async addBranch(req, res) {
    try {
      const { branch_number, name, location } = req.body;
      console.log(req.body);
      console.log(branch_number, name, location);
      if (!branch_number || !name || !location) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const newBranch = await branchService.addBranch({ branch_number, name, location });
      res.status(201).json(newBranch);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async editBranch(req, res) {
    try {
      const { id } = req.params;
      const { branch_number, name, location } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Branch ID is required' });
      }

      const updatedBranch = await branchService.editBranch(id, { branch_number, name, location });
      res.status(200).json(updatedBranch);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getBranch(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: 'Branch ID is required' });
      }
      const branch = await branchService.getBranch(id);
      if (!branch) {
        return res.status(404).json({ error: 'Branch not found' });
      }
      res.status(200).json(branch);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = branchController;
