const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const aboutModel = {
  async updateData({
    id,
    title,
    imagepath,
    imagepath2,
    imagepath3,
    heading1,
    subheading1,
    detail1,
    heading2,
    subheading2,
    detail2,
  }) {
    const updatedHomepage = await prisma.Aboutus.update({
      where: { id: "1" }, // Specify the ID of the entity to update
      data: {
        title,
        imagepath,
        imagepath2,
        imagepath3,
        heading1,
        subheading1,
        detail1,
        heading2,
        subheading2,
        detail2,
        // ... Include other fields you want to update
      },
    });
    return { message: "Homepage updated successfully", updatedHomepage };
  },
  async getAllData() {
    return await prisma.Aboutus.findFirst();
  },
};
module.exports = aboutModel;
