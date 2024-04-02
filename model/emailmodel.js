const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const emailModel = {
  async getEmail() {
    try {
      const data = await prisma.Emailtemplate.findFirst();

      return data;
    } catch (error) {
      console.error(error);
    }
  },
  async updateEmail(Id, Subject, Body) {
    const resultdata = await prisma.Emailtemplate.update({
      where: {
        id: Id,
      },
      data: {
        subject: Subject,
        body: Body,
      },
    });

    return resultdata;
  },
};
module.exports = emailModel;
