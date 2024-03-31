const BackgroudImageModel = require("../model/backgroundimagemodel");

const BackgroudImageController = {
  async getSliderImages(req, res) {
    // Changed parameter name from "res" to "req"
    try {
      const images = await BackgroudImageModel.getBackgroundImages(); // Added parentheses to call the function
      res.json(images);
    } catch (error) {
      res.json(error);
    }
  },
};

module.exports = BackgroudImageController;
