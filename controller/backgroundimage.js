const BackgroundImageModel = require("../model/backgroundimagemodel");
const deleteFile = require("../middlewares/mutlerdeletemiddleware");

const BackgroudImageController = {
  async selectSliderimage(req, res) {
    const path = req.body.url;

    try {
      const image = await BackgroundImageModel.setSliderImage(path);

      return res.json(image);
    } catch (error) {
      console.error("Error setting image:", error);
      res.status(500).json({ error: "Failed to set image" });
    }
  },
  async deleteSliderImages(req, res) {
    const url = req.body.url;
    try {
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
