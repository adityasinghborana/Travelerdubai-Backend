const model = require("../model/addtourmodel");

const addTourController = {
  async addTour(req, res) {
    const tourdata = req.body;

    try {
      const data = await model.createTourUser(tourdata);
      return res.json({ result: data });
    } catch (error) {
      return res.json({ error: error });
    }
  },
};
module.exports = addTourController;
