const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const BackgroudImageModel = {
  async setSliderImage(imageurl) {
    try {
      const imagess = await prisma.BackgroundImage.create({
        data: {
          url: imageurl,
          isVisibleSlider: true,
        },
      });
      console.log(imagess);
      return { imagess };
    } catch (error) {
      console.log(error);
    }
  },
  async deleteBackgroundImages(path) {
    try {
      const images = await prisma.BackgroundImage.deleteMany({
        where: {
          url: path,
        },
      });

      console.log(`Deleted background images with path: ${path}`);
      return images;
    } catch (error) {
      console.error(`Error deleting background images: ${error.message}`);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  },
};

module.exports = BackgroudImageModel;
