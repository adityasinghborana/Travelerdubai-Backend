const BackgroudImageModel = require("../model/backgroundimagemodel");
const allimageService = require('../model/allimageservice');

const BackgroudImageController = {
  getAllImages: async (req, res) => {
    try {
      const images = await allimageService.listAllImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: 'Unable to retrieve images', error: error.message });
    }
  },
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
