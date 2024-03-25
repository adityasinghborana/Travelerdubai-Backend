const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const tourmodel = {
  async getallCity() {
    return await prisma.City.findMany();
  },
  async CityTourTypes() {
    const uniqueCityTourTypes = await prisma.tourstaticdata.findMany({
      distinct: ["cityTourType"],
      select: {
        cityTourType: true,
      },
    });
    return uniqueCityTourTypes;
  },

  async getalltours() {
    return await prisma.tourstaticdata.findMany({
      include: {
        tourdetails: true,
        tourpricing: true,
      },
    });
  },

  // not using this function
  async gettourdata(tourId) {
    return await prisma.tourstaticdatabyid.findUnique({
      where: {
        id: tourId,
      },
      include: {
        tourImages: true,
        tourReviews: true,
      },
    });
  },
  // end of the function get tor data
};
module.exports = tourmodel;
