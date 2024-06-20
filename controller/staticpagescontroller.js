const model = require("../model/staticpagesmodel");

const StaticPageController = {
  async getContactUsData(req, res) {
    try {
      const data = await model.GetContactUs();
      return res.json(data);
    } catch (error) {
      return res.json({ error: error });
    }
  },
  async getFooterData(req, res) {
    try {
      const data = await model.GetFooterData();
      console.log(data);

      return res.json({ data });
    } catch (error) {
      console.log("hello");
      return res.json({ error: error });
    }
  },
  async getExperiencesData(req, res) {
    try {
      const data = await model.getExperiences();
      return res.json({ result: data });
    } catch (error) {
      return res.json({ error: error });
    }
  },
  async getFormSubmisisionData(req, res) {
    try {
      const data = await model.GetFormSubmission();
      return res.json(data);
    } catch (error) {
      return res.json({ error: error });
    }
  },
  async updateContactUsData(req, res) {
    try {
      const updatedData = req.body; // Assumes updated data is sent in the request body
      const data = await model.UpdateContactUs(updatedData);
      return res.json({ result: data });
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  async updateFooterData(req, res) {
    try {
      const updatedData = req.body; // Assumes updated data is sent in the request body
      const data = await model.UpdateFooterData(updatedData);
      return res.json({ result: data });
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  async updateExperiencesData(req, res) {
    try {
      const updatedData = req.body; // Assumes updated data is sent in the request body
      const data = await model.UpdateExperiences(updatedData);
      return res.json({ result: data });
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  async PostFormSubmission(req, res) {
    try {
      const updatedData = req.body; // Assumes updated data is sent in the request body
      const data = await model.CreateFormSubmission(updatedData);
      return res.json({ result: data });
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
};
module.exports = StaticPageController;
