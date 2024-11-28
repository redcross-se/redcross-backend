const Application = require('../models/applications'); 

const applicationService = {
  async getApplicationsByStatus(status) {
    if(status === 'All') {
      return await Application.findAll();
    }
    return await Application.findAll({ where: { status } });
  },

  async addApplication(applicationData) {
    return await Application.create(applicationData);
  },

  async updateApplication(id, applicationData) {
    const application = await Application.findByPk(id);
    if (!application) {
      throw new Error('Application not found');
    }
    return await application.update(applicationData);
  },

  async getApplicationById(id) {
    return await Application.findByPk(id);
  },
};

module.exports = applicationService;
