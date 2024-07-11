const eventModel = require("../model/eventmodel");

const eventController = {
  async getalleventtype(req, res) {
    try {
      const data = await eventModel.CityeventTypes(); // Adjusted method call
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getallevents(req, res) {
    try {
      const data = await eventModel.getallevents(); // Adjusted method call
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async getevent(req, res) {
    try {
      const params = req.body;
      const data = await eventModel.getevent(params); // Adjusted method call
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
module.exports = eventController;
