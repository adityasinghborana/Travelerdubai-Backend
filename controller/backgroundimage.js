const BackgroundImageModel = require("../model/backgroundimagemodel");
const allimageService = require("../model/allimageservice");
const deleteFile = require("../middlewares/mutlerdeletemiddleware");

const BackgroudImageController = {
  getAllImages: async (req, res) => {
    try {
      const images = await allimageService.listAllImages();
      res.json(images);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Unable to retrieve images", error: error.message });
    }
  },
  async getSliderImages(req, res) {
    // Changed parameter name from "res" to "req"
    try {
      const images = await BackgroundImageModel.getBackgroundImages(); // Added parentheses to call the function
      res.json(images);
    } catch (error) {
      res.json(error);
    }
  },
  async deleteSliderImages(req, res) {
    //const url = "image-1718372178319.png";
    //const url = req.params.url;
    const url = req.body.url;
    try {
      // Delete file using deleteFile middleware
      deleteFile(url);

      // Delete corresponding database records (optional, if applicable)
      const images = await BackgroundImageModel.deleteBackgroundImages(url);

      res.json({
        message: `Deleted file and corresponding database records for: ${url}`,
      });
    } catch (error) {
      console.error("Error deleting slider images:", error);
      res.status(500).json({
        error: "Failed to delete slider images",
        message: error.message,
      });
    }
  },
};

module.exports = BackgroudImageController;
