const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const BackgroudImageModel = {
  async getBackgroundImages() {
    const images = await prisma.BackgroundImage.findMany();
    console.log(images);
    return images;
  },
};

module.exports = BackgroudImageModel;
