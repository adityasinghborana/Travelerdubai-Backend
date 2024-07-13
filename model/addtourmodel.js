const { PrismaClient } = require("@prisma/client");
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
      newTourId = Math.floor(Math.random() * 10000); // Adjust the range as needed
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
      existingIds.map((idObj) => idObj.tourOptionId)
    );

    let newTourOptionId;
    do {
      newTourOptionId = Math.floor(Math.random() * 10000); // Adjust the range as needed
    } while (existingOptionIdSet.has(newTourOptionId));

    return newTourOptionId;
  },

  async generateUniqueTimeSlotId() {
    const existingIds = await prismaClient.TimeSlot.findMany({
      select: {
        id: true,
      },
    });

    const existingTimeSlotIdSet = new Set(existingIds.map((idObj) => idObj.id));

    let newTimeSlotId;
    do {
      newTimeSlotId = Math.floor(Math.random() * 10000); // Adjust the range as needed
    } while (existingTimeSlotIdSet.has(newTimeSlotId));

    return newTimeSlotId;
  },

  async createTourUser(params) {
    try {
      const gtourId = await this.generateUniqueTourId();

      const data = await prismaClient.Tourstaticdata.create({
        data: {
          tourId: gtourId,
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
          vendorUid: params.vendoruid,
          isVendorTour: params.isvendortour,
          recommended: params.isrecommended,
          isPrivate: true,
          isSlot: params.isslot,
        },
      });
      // need to be added in admin panel and
      try {
        const Tourprice = await prismaClient.TourPricing.create({
          data: {
            tourId: gtourId,
            contractId: 300,
            amount: params.amount,
            adultPrice: params.adultprice,
            childPrice: params.childprice,
            infantPrice: params.infantprice,
          },
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }

      const databyid = await prismaClient.Tourstaticdatabyid.create({
        data: {
          TourId: gtourId,
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
          isVendorTour: params.isvendortour,
          infantCount: params.infantcount,
          onlyChild: params.isonlychild,
          startTime: params.starttime,
          meal: params.meal,
          googleMapUrl: params.googlemapurl,
          tourExclusion: params.tourexclusion,
          vendorUid: params.vendoruid,
        },
      });

      // Iterate over optionlist to create TourOption, OperationDay, and TimeSlot records
      const tourOptionsList = await Promise.all(
        params.optionlist.map(async (option) => {
          const gtourOptionId = await this.generateUniqueTourOptionId(); // Generate a unique ID for each option

          // Create TourOption
          const createdTourOption = await prismaClient.TourOption.create({
            data: {
              tourId: gtourId,
              tourOptionId: gtourOptionId,
              optionName: option.optionname,
              childAge: option.childage,
              infantAge: option.infantage,
              optionDescription: option.optiondescription,
              minPax: option.minpax,
              maxPax: option.maxpax,
              duration: option.duration,
            },
          });

          // Create OperationDay for each TourOption
          const createdOperationDay = await prismaClient.OperationDay.create({
            data: {
              tourId: gtourId,
              tourOptionId: createdTourOption.id,
              monday: option.operationDays.monday,
              tuesday: option.operationDays.tuesday,
              wednesday: option.operationDays.wednesday,
              thursday: option.operationDays.thursday,
              friday: option.operationDays.friday,
              saturday: option.operationDays.saturday,
              sunday: option.operationDays.sunday,
            },
          });

          // Create TimeSlot for each TourOption
          const createdTimeSlots = await Promise.all(
            (option.timeSlots || []).map(async (timeSlot) => {
              const gtimeSlotId = await this.generateUniqueTimeSlotId();
              const timeslotidstring = gtimeSlotId.toString();

              return prismaClient.TimeSlot.create({
                data: {
                  tourOptionId: createdTourOption.tourOptionId,
                  timeSlotId: timeslotidstring,
                  timeSlot: timeSlot.timeSlot,
                  available: timeSlot.available,
                  adultPrice: timeSlot.adultPrice,
                  childPrice: timeSlot.childPrice,
                },
              });
            })
          );
          const createdTourImagessList = await Promise.all(
            params.imagepaths.map(async (ImagePath) => {
              try {
                const createdTourImagess =
                  await prismaClient.TourImagess.createMany({
                    data: {
                      tourId: gtourId,
                      imagePath: ImagePath,
                    },
                  });

                return createdTourImagess;
              } catch (error) {
                console.error(`Error creating TourImagess: ${error}`);
                throw error;
              }
            })
          );
        })
      );

      return { status: 200 };
    } catch (e) {
      return { status: 501, e };
      console.log(e);
      throw e; // It's a good practice to re-throw the error after logging it
    }
  },
};

module.exports = AddTourUser;
