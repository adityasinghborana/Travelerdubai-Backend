const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const RolesModel = {
  async FetchVendor() {
    await prisma.roles.findFirst({
      where: {
        uid,
      },
    });
  },

  async FetchAllVendors() {
    await prisma.roles.findMany();
  },
};
module.exports = RolesModel;
