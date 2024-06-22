const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const BackgroudImageModel = {
  async getBackgroundImages() {
    const images = await prisma.BackgroundImage.findMany({
      where: {
        isVisibleSlider: true,
      },
    });
    console.log(images);
    return images;
  },
  async deleteBackgroundImages(path) {
    try {
      const images = await prisma.backgroundImage.deleteMany({
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
