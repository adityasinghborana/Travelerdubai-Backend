const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const homeModel = {
  async adddata({
    counter1,
    counter2,
    counter3,
    counter4,
    detail,
    detail1,
    detail2,
    gridsectionheading,
    gridsectionsubheading,
    heading1,
    heading2,
    heading3,
    heading4,
    imagepath,
    imagepath2,
    imagepath3,
    label1,
    label2,
    label3,
    label4,
    subheading1,
    subheading2,
    subtitle,
    title,
  }) {
    await prisma.Homepage.create({
      data: {
        counter1,
        counter2,
        counter3,
        counter4,
        detail,
        detail1,
        detail2,
        gridsectionheading,
        gridsectionsubheading,
        heading1,
        heading2,
        heading3,
        heading4,
        imagepath,
        imagepath2,
        imagepath3,
        label1,
        label2,
        label3,
        label4,
        subheading1,
        subheading2,
        subtitle,
        title,
      },
    });
    return { message: "Image added successfully" };
  },
  async updateData({
    id,
    counter1,
    counter2,
    counter3,
    counter4,
    detail,
    detail1,
    detail2,
    gridsectionheading,
    gridsectionsubheading,
    heading1,
    heading2,
    heading3,
    heading4,
    imagepath,
    imagepath2,
    imagepath3,
    label1,
    label2,
    label3,
    label4,
    subheading1,
    subheading2,
    subtitle,
    title,
  }) {
    const updatedHomepage = await prisma.Homepage.update({
      where: { id }, // Specify the ID of the entity to update
      data: {
        counter1,
        counter2,
        counter3,
        counter4,
        detail,
        detail1,
        detail2,
        gridsectionheading,
        gridsectionsubheading,
        heading1,
        heading2,
        heading3,
        heading4,
        imagepath,
        imagepath2,
        imagepath3,
        label1,
        label2,
        label3,
        label4,
        subheading1,
        subheading2,
        subtitle,
        title,
        // ... Include other fields you want to update
      },
    });
    return { message: "Homepage updated successfully", updatedHomepage };
  },

  async getAllData() {
    return await prisma.Homepage.findMany();
  },
  async getBackgroundimages() {
    return await prisma.BackgroundImage.findMany();
  },

  async addimage({ imageUrl }) {
    await prisma.BackgroundImage.create({
      data: {
        imageUrl,
      },
    });
    return { message: "Image added successfully" };
  },

  async deleteimage(id) {
    await prisma.BackgroundImage.delete({
      where: {
        id,
      },
    });

    return { message: "Image deleted successfully" };
  },
};
module.exports = homeModel;
