const homepageModel = require("../model/homepagemodel");

const homeController = {
  async addAllData(req, res) {
    try {
      const data = await homepageModel.adddata(req.body);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      const errorMessage = error.message || "Internal server error";
      res.status(500).json({ error: errorMessage });
    }
  },
  async updateAllData(req, res) {
    try {
      const data = await homepageModel.updateData(req.body); // Assuming the body contains the update data and ID
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      const errorMessage = error.message || "Internal server error";
      res.status(500).json({ error: errorMessage });
    }
  },

  async getAllData(req, res) {
    try {
      const data = await homepageModel.getAllData(); // Adjusted method call
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getbgimage(req, res) {
    try {
      const data = await homepageModel.getBackgroundimages(); // Adjusted method call
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async addbgimage(req, res) {
    try {
      const newImage = await homepageModel.addimage(req.body);
      res.status(200).json(newImage);
    } catch (error) {
      console.error(error);
      const errorMessage = error.message || "Internal server error";
      res.status(500).json({ error: errorMessage });
    }
  },

  async deletebgimage(req, res) {
    try {
      const { id } = req.body;
      const result = await homepageModel.deleteimage(id);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      const errorMessage = error.message || "Internal server error";
      res.status(500).json({ error: errorMessage });
    }
  },
};

module.exports = homeController;
