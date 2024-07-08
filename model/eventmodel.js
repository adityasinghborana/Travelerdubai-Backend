const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const eventmodel = {
  async CityeventTypes() {
    const uniqueCityeventTypes = await prisma.EventTypes.findMany();
    return uniqueCityeventTypes;
  },

  async getallevents() {
    return await prisma.Eventdata.findMany({
      include: {
        eventdetail: true,
      },
    });
  },
  async getevent(params) {
    return await prisma.EventDetail.findUnique({
      where: {
        id: params.id,
      },

      include: {
        eventoptions: true,
        images: true,
      },
    });
  },
};

module.exports = eventmodel;
