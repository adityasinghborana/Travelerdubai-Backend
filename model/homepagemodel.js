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
    id,
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
        id,
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
  async getBackgroundimages() {
    const images = await prisma.BackgroundImage.findMany({
      where: {
        isVisibleSlider: true,
      },
    });
    console.log(images);
    return images;
  },
  // async updateBackgroundimages(value) {
  //   const images = await prisma.BackgroundImage.update({
  //     where: {
  //       id: value.id,
  //     },
  //     data: {
  //       isVisibleSlider: value.isChecked,
  //     },
  //   });
  //   console.log(images);
  //   return images;
  // },
};
module.exports = homeModel;
