const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const eventmodel = {
  async CityeventTypes() {
    const uniqueCityeventTypes = await prisma.Eventdata.findMany({
      select: {
        cityeventType: true,
      },
    });
    return uniqueCityeventTypes;
  },

  async getallevents() {
    return await prisma.Eventdata.findMany();
  },
};

module.exports = eventmodel;
