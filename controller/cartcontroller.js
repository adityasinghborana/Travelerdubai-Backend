// cartController.js

const Cartmodel = require("../model/cart");

const cartcontroller = {
  async createCart(req, res) {
    try {
      // Extract userId from request parameters
      //const userId = req.params.userId; // Update this line
      const User = req.body;
      console.log(User);

      // Check if userId is undefined or empty
      if (!User) {
        return res.status(400).json({
          success: false,
          error: "userId is missing in the request parameters",
        });
      }

      // Assuming cart data is sent in the request body

      const newCart = await Cartmodel.createCart(User);
      res.json({ success: true, data: newCart });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async getCart(req, res) {
    try {
      // Extract userId from request parameters
      //const userId = req.params.userId; // Update this line
      const User = req.body;
      console.log(User);

      // Check if userId is undefined or empty
      if (!User) {
        return res
          .status(400)
          .json({ success: false, error: "userId is missing in the body" });
      }

      // Assuming cart data is sent in the request body

      const Cart = await Cartmodel.getCart(User);
      res.json({ success: true, data: Cart });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async updateCartTourDetail(req, res) {
    try {
      const updatedData = req.body;

      // Find the CartTourDetail by ID

      // Update the CartTourDetail with the provided data
      const updatedCartTourDetail = await Cartmodel.updateCartTourDetail(
        updatedData
      );

      res.json({ success: true, data: updatedCartTourDetail });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },
  async deleteCartTourDetail(req, res) {
    try {
      const data = req.body.id;

      const deletedCartTourDetail = await Cartmodel.deleteCartdetail(data);

      return res.status(200).json({ status: 200, deletedCartTourDetail });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: error.message });
    }
  },
};
module.exports = cartcontroller;
