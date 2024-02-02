const aboutModel = require("../model/aboutuspagemodel");
const AboutpageModel = require("../model/aboutuspagemodel");

const aboutController = {
  async updateAllData(req, res) {
    try {
      const data = await aboutModel.updateData(req.body); // Assuming the body contains the update data and ID
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      const errorMessage = error.message || "Internal server error";
      res.status(500).json({ error: errorMessage });
    }
  },

  async getAllData(req, res) {
    try {
      const data = await aboutModel.getAllData(); // Adjusted method call

      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
module.exports = aboutController;
