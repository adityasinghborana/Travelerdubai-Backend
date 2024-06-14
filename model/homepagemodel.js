const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const homeModel = {
  async adddata({
    gridsectionheading,
    gridsectionsubheading,
    heading1,
    heading2,
    heading3,
    imagepath,
    imagepath2,
    imagepath3,
    subtitle,
    detail,
    title,
  }) {
    await prisma.Homepage.create({
      data: {
        gridsectionheading,
        gridsectionsubheading,
        heading1,
        heading2,
        heading3,
        imagepath,
        imagepath2,
        imagepath3,
        subtitle,
        detail,
        title,
      },
    });
    return { message: "Image added successfully" };
  },
  async updateData({
    gridsectionheading,
    gridsectionsubheading,
    heading1,
    heading2,
    heading3,
    imagepath,
    imagepath2,
    imagepath3,
    subtitle,
    detail,
    title,
  }) {
    const updatedHomepage = await prisma.homepage.update({
      where: { id }, // Specify the ID of the entity to update
      data: {
        gridsectionheading,
        gridsectionsubheading,
        heading1,
        heading2,
        heading3,
        imagepath,
        imagepath2,
        imagepath3,
        subtitle,
        detail,
        title,
      },
    });
    return { message: "Homepage updated successfully", updatedHomepage };
  },

  async getAllData() {
    return await prisma.homepage.findFirst();
  },
  async getBackgroundimages() {
    return await prisma.backgroundImage.findMany({where:{
      isVisibleSlider:true
    }});
  },

  async addimage({ imageUrl }) {
    await prisma.backgroundImage.create({
      data: {
        imageUrl,
      },
    });
    return { message: "Image added successfully" };
  },

  async deleteimage(id) {
    await prisma.backgroundImage.delete({
      where: {
        id,
      },
    });

    return { message: "Image deleted successfully" };
  },
};
module.exports = homeModel;
