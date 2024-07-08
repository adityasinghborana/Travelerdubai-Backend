// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// const AddEventModel = {
//   async createEventUser(params) {
//     const {
//       isVisible,
//       isVisibleHome,
//       cityId,
//       eventName,
//       duration,
//       imagePath,
//       eventType,
//       isSlot,
//       onlyChild,
//       recommended,
//       vendorUid,
//       eventDetail,
//     } = params;

//     try {
//       // Create the event
//       const event = await prisma.eventdata.create({
//         data: {
//           isVisible,
//           isVisibleHome,
//           cityId,
//           eventName,
//           duration,
//           imagePath,
//           eventType,
//           isSlot,
//           onlyChild,
//           recommended,
//           vendorUid,
//         },
//       });

//       // Create the event detail and link it to the created event
//       const eventDetailRecord = await prisma.eventDetail.create({
//         data: {
//           eventName: eventDetail.eventName,
//           description: eventDetail.description,
//           date: new Date(eventDetail.date),
//           location: eventDetail.location,
//           googlemapurl: eventDetail.googlemapurl,
//           minage: eventDetail.minage,
//           moreinfo: eventDetail.moreinfo,
//           ticketinfo: eventDetail.ticketinfo,
//           artistname: eventDetail.artistname,
//           artistimage: eventDetail.artistimage,
//           lastbookingtime: new Date(eventDetail.lastbookingtime),
//           eventSelling: eventDetail.eventSelling,
//           ischildallowed: eventDetail.ischildallowed,
//           isadultallowed: eventDetail.isadultallowed,
//           isinfantallowed: eventDetail.isinfantallowed,
//           duration: eventDetail.duration,
//           vendorUid: event.vendorUid,
//           eventdetailid: event.id, // Link to the created event
//         },
//       });

//       return { event, eventDetail: eventDetailRecord };
//     } catch (error) {
//       console.error("Error creating event:", error);
//       return { error: error.message };
//     }
//   },
// };

// module.exports = AddEventModel;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const AddEventModel = {
  async createEventUser(params) {
    const {
      isVisible,
      isVisibleHome,
      cityId,
      eventName,
      duration,
      imagePath,
      eventType,
      isSlot,
      onlyChild,
      recommended,
      vendorUid,
      eventDetail,
    } = params;

    try {
      // Create the event
      const event = await prisma.eventdata.create({
        data: {
          isVisible,
          isVisibleHome,
          cityId,
          eventName,
          duration,
          imagePath,
          eventType,
          isSlot,
          onlyChild,
          vendorUid,
          recommended,
          vendorUid,
        },
      });

      // Create the event detail and link it to the created event
      const eventDetailRecord = await prisma.eventDetail.create({
        data: {
          eventName: eventDetail.eventName,
          description: eventDetail.description,
          date: new Date(eventDetail.date),
          location: eventDetail.location,
          googlemapurl: eventDetail.googlemapurl,
          minage: eventDetail.minage,
          moreinfo: eventDetail.moreinfo,
          ticketinfo: eventDetail.ticketinfo,
          artistname: eventDetail.artistname,
          artistimage: eventDetail.artistimage,
          lastbookingtime: new Date(eventDetail.lastbookingtime),
          eventSelling: eventDetail.eventSelling,
          ischildallowed: eventDetail.ischildallowed,
          isadultallowed: eventDetail.isadultallowed,
          vendorUid: event.vendorUid,
          isinfantallowed: eventDetail.isinfantallowed,
          duration: eventDetail.duration,
          eventdata: { connect: { id: event.id } }, // Link to the created event
        },
      });

      // Create EventOptions
      if (eventDetail.eventoptions && eventDetail.eventoptions.length > 0) {
        for (const option of eventDetail.eventoptions) {
          await prisma.eventOption.create({
            data: {
              //eventId: eventDetailRecord.id,
              optionname: option.optionname,
              adultprice: option.adultprice,
              childprice: option.childprice,
              infantprice: option.infantprice,
              optiondescription: option.optiondescription,
              available: option.available,
              eventdetail: { connect: { id: eventDetailRecord.id } },
              timeslots: {
                create: option.timeslots.map((slot) => ({
                  timeSlot: slot.timeSlot,
                  available: slot.available,
                  adultPrice: slot.adultPrice,
                  childPrice: slot.childPrice,
                })),
              },
            },
          });
        }
      }

      // Create EventImages
      if (eventDetail.images && eventDetail.images.length > 0) {
        for (const image of eventDetail.images) {
          await prisma.eventImages.create({
            data: {
              eventDetailId: eventDetailRecord.id,
              imagePath: image.imagePath,
            },
          });
        }
      }

      return { event, eventDetail: eventDetailRecord };
    } catch (error) {
      console.error("Error creating event:", error);
      return { error: error.message };
    }
  },
};

module.exports = AddEventModel;
