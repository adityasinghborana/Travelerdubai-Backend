const tourModel = require("../model/tourmodel");

const tourController = {
  async getAllData(req, res) {
    try {
      const data = await tourModel.getallCity(); // Adjusted method call
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getalltourtype(req, res) {
    try {
      const data = await tourModel.CityTourTypes(); // Adjusted method call
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getallTours(req, res) {
    try {
      const data = await tourModel.getalltours(); // Adjusted method call
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async gettoursData(req, res) {
    const tourId = parseInt(req.query.id);
    try {
      const data = await tourModel.gettourdata(tourId); // Adjusted method call
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async deleteToursData(req, res) {
    const tour = parseInt(req.query.id);
    console.log(tour);
    try {
      const data = await tourModel.deleteTourById(tour); // Adjusted method call
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = tourController;
