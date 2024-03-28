const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Controller function for handling image upload
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { originalname, path } = req.file;

    // Save image data to the database
    const image = await prisma.BackgroundImage.create({
      data: {
        filename: originalname,
        url: path, // Assuming path is the URL where the image is stored
      },
    });

    res.json({ message: "Image uploaded successfully", image });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};
