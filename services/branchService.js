const Branch = require('../models/branch');

const branchService = {

  async getAllBranches() {
    return await Branch.findAll();
  },


  async addBranch(branchData) {
    return await Branch.create(branchData);
  },

  async editBranch(id, branchData) {
    const branch = await Branch.findByPk(id);
    if (!branch) {
      throw new Error('Branch not found');
    }
    return await branch.update(branchData);
  },
  async getBranch(id) {
    return await Branch.findByPk(id);
  },
};

module.exports = branchService;
