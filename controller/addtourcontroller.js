const model = require("../model/addtourmodel");

const addTourController = {
  async addTour(req, res) {
    const tourdata = req.body;
    console.log(tourdata);
    try {
      const data = await model.createTourUser(tourdata);
      console.log(data);
      return res.json({ result: data });
    } catch (error) {
      console.log(error);
      return res.json({ error: error });
    }
  },
};
module.exports = addTourController;
