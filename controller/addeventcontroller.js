const model = require("../model/addeventmodel");

const addEventController = {
  async addEvent(req, res) {
    const reqdata = req.body;
    console.log(req.body);
    try {
      const data = await model.createEventUser(reqdata);
      return res.json({ result: data });
    } catch (error) {
      return res.json({ error: error });
    }
  },
};
module.exports = addEventController;
