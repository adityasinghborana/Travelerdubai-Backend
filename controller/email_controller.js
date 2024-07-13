const model = require("../model/emailmodel");
const EmailController = {
  async getEmail(req, res) {
    try {
      const data = await model.getEmail();
      res.json(data);
    } catch (error) {
      console.error(error);
    }
  },
  async updateEmail(req, res) {
    const data = req.body;
    try {
      const result = await model.updateEmail(data.id, data.subject, data.body);
      res.json(result);
    } catch (error) {
      console.error(error);
    }
  },
};
module.exports = EmailController;
