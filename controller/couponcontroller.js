const model = require("../model/couponsmodel");

const CopounController = {
  async getCoupons(req, res) {
    try {
      const data = await model.getCoupon();
      return res.json({ result: data });
    } catch (error) {
      console.log(error);
      return res.json({ error: error });
    }
  },
  async createCoupons(req, res) {
    try {
      body = req.body;
      console.log(body);
      const data = await model.createCoupon(body);
      return res.json(data);
    } catch (error) {
      console.log(error);
      return res.json({ error: error });
    }
  },
  async deleteCoupons(req, res) {
    try {
      body = req.body;
      console.log(body);
      const data = await model.DeleteCoupon(body);
      return res.json(data);
    } catch (error) {
      console.log(error);
      return res.json({ error: error });
    }
  },

  async checkCoupons(req, res) {
    try {
      body = req.body;
      console.log(body);
      const data = await model.checkCoupon(body);
      return res.json(data);
    } catch (error) {
      console.log(error);
      return res.json({ error: error });
    }
  },
};
module.exports = CopounController;
