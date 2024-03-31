const apiModel = require("../model/apimodel");

const ApiController = {
  async getRayanaApi(req, res) {
    try {
      const apiKey = await apiModel.getRayanaApiKey(); // Added parentheses to call the function getApiKey
      return res.json(apiKey);
    } catch (error) {
      console.error(error); // Changed console.log to console.error for error logging
      res
        .status(500)
        .json({ error: "An error occurred while fetching API key" }); // Added response status and error message
    }
  },
  async UpdateRayanaApi(req, res) {
    try {
      const Key = req.body;
      console.log(Key);
      const apiKey = await apiModel.updateRayanaApiKey(Key); // Added parentheses to call the function getApiKey
      return res.json(apiKey);
    } catch (error) {
      console.error(error); // Changed console.log to console.error for error logging
      res
        .status(500)
        .json({ error: "An error occurred while updating API key" }); // Added response status and error message
    }
  },
  async getStripeSecretApi(req, res) {
    try {
      const apiKey = await apiModel.getStripeSecretApiKey(); // Added parentheses to call the function getApiKey
      return res.json(apiKey);
    } catch (error) {
      console.error(error); // Changed console.log to console.error for error logging
      res
        .status(500)
        .json({ error: "An error occurred while fetching API key" }); // Added response status and error message
    }
  },
  async UpdateStripeSecretApi(req, res) {
    try {
      const Key = req.body;
      console.log(Key);
      const apiKey = await apiModel.updateStripeSecretApiKey(Key); // Added parentheses to call the function getApiKey
      return res.json(apiKey);
    } catch (error) {
      console.error(error); // Changed console.log to console.error for error logging
      res
        .status(500)
        .json({ error: "An error occurred while updating API key" }); // Added response status and error message
    }
  },
};

module.exports = ApiController;
