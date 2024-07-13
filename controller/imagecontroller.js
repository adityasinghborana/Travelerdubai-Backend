const { PrismaClient } = require("@prisma/client");
const allimageService = require("../model/allimageservice");
const prisma = new PrismaClient();

// Controller function for handling image upload

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { originalname, path } = req.file;

    // Save image data to the database

    res.json({ message: "Image uploaded successfully", originalname, path });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};

exports.deleteImage = async (req, res) => {
  const url = req.body.url;
  try {
    deleteFile(url);

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
};

exports.getAllImages = async (req, res) => {
  try {
    const images = await allimageService.listAllImages();
    res.json(images);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to retrieve images", error: error.message });
  }
};
