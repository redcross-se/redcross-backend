const applicationService = require('../services/applicationService');

const applicationController = {
  async getApplications(req, res) {
    try {
      const { status } = req.query;
      if (!status) {
        return res.status(400).json({ error: 'Status query parameter is required' });
      }
      const applications = await applicationService.getApplicationsByStatus(status);
      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async addApplication(req, res) {
    try {
      const { name, age, gender, status } = req.body;
      if (!name || !age || !gender || !status) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const newApplication = await applicationService.addApplication({ name, age, gender, status });
      res.status(201).json(newApplication);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async updateApplicationStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      if (!id) {
        return res.status(400).json({ error: 'Application ID is required' });
      }
      if (!status || !['Accepted', 'Rejected']) {
        return res.status(400).json({ error: 'Valid status ("accepted" or "rejected") is required' });
      }
  
      const updatedApplication = await applicationService.updateApplication(id, { status });
      res.status(200).json({ message: 'Application status updated successfully', updatedApplication });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateApplication(req, res) {
    try {
      const { id } = req.params;
      const { name, age, gender, status } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Application ID is required' });
      }

      const updatedApplication = await applicationService.updateApplication(id, { name, age, gender, status });
      res.status(200).json(updatedApplication);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getApplication(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: 'Application ID is required' });
      }
      const application = await applicationService.getApplicationById(id);
      if (!application) {
        return res.status(404).json({ error: 'Application not found' });
      }
      res.status(200).json(application);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = applicationController;
