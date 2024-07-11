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
      },
    });
  },
  // end of the function get tor data

  async deleteTourById(tourId) {
    try {
      // Delete tour static data
      await prisma.Tourstaticdata.delete({
        where: { tourId: tourId },
      });

      console.log(
        `Tour with ID ${tourId} and associated data deleted successfully.`
      );
    } catch (error) {
      console.error(
        `Error deleting tour with ID ${tourId} and associated data:`,
        error
      );
      throw new Error(
        `Error deleting tour with ID ${tourId} and associated data`
      );
    }
  },
};
module.exports = tourmodel;
