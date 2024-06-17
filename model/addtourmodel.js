const prisma = require("@prisma/client"); // Assuming you have prisma client installed and setup
const { PrismaClient } = prisma;
const prismaClient = new PrismaClient();

const AddTourUser = {
  async generateUniqueTourId() {
    const existingIds = await prismaClient.Tourstaticdata.findMany({
      select: {
        tourId: true,
      },
    });

    const existingIdSet = new Set(existingIds.map((idObj) => idObj.tourId));

    let newTourId;
    do {
      newTourId = Math.floor(Math.random() * 10000); // You can adjust the range as needed
    } while (existingIdSet.has(newTourId));

    return newTourId;
  },

  async generateUniqueTourOptionId() {
    const existingIds = await prismaClient.TourOption.findMany({
      select: {
        tourOptionId: true,
      },
    });

    const existingOptionIdSet = new Set(
      existingOptionIds.map((idObj) => idObj.tourOptionId)
    );

    let newTourOptionId;
    do {
      newTourOptionId = Math.floor(Math.random() * 10000); // You can adjust the range as needed
    } while (existingOptionIdSet.has(newTourOptionId));

    return newTourOptionId;
  },

  async createTourUser(params) {
    try {
      const tourId = await this.generateUniqueTourId();
      const tourOptionId = await this.generateUniqueTourOptionId();

      const data = await prismaClient.Tourstaticdata.create({
        data: {
          tourId: tourId,
          countryId: params.countryid,
          countryName: params.countryname,
          cityId: params.cityid,
          cityName: params.cityname,
          tourName: params.tourname,
          duration: params.duration,
          imagePath: params.imagepath,
          cityTourTypeId: params.citytourtypeid,
          cityTourType: params.citytourtype,
          contractId: 300,
          recommended: params.isrecommended,
          isPrivate: true,
          isSlot: params.isslot,
        },
      });

      const databyid = await prismaClient.tourstaticdatabyid.create({
        data: {
          TourId: tourId,
          countryId: params.countryid,
          countryName: params.countryname,
          cityId: params.cityid,
          cityName: params.cityname,
          tourName: params.tourname,
          duration: params.duration,
          imagePath: params.imagepath,
          cityTourTypeId: params.citytourtypeid,
          cityTourType: params.citytourtype,
          contractId: params.contractid,
          isSlot: params.isslot,
          tourDescription: params.tourdescription,
          tourInclusion: params.tourinclusion,
          tourShortDescription: params.shortdescription,
          importantInformation: params.importantinformation,
          itenararyDescription: params.itenararydescription,
          usefulInformation: params.usefulinformation,
          childAge: params.childage,
          infantAge: params.infantage,
          infantCount: params.infantcount,
          onlyChild: params.isonlychild,
          startTime: params.starttime,
          meal: params.meal,
          googleMapUrl: params.googlemapurl,
          tourExclusion: params.tourexclusion,
        },
      });
      const tourOptionsList = params.optionlist.map((option) => ({
        tourId: tourId, // Ensure tourId is defined
        tourOptionId: option.tourOptionId, // Ensure each option in the list has a unique tourOptionId
        optionName: option.optionName,
        childAge: option.childAge,
        infantAge: option.infantAge,
        optionDescription: option.optionDescription,
        minPax: option.minPax,
        maxPax: option.maxPax,
        duration: option.duration,
      }));

      // Use createMany to insert the list of tour options
      const optiondatabyid = await prisma.TourOption.createMany({
        data: tourOptionsList,
        skipDuplicates: true, // Optionally skip duplicates if needed
      });

      return { data, databyid };
    } catch (e) {
      console.log(e);
      throw e; // It's a good practice to re-throw the error after logging it
    }
  },
};

module.exports = AddTourUser;
