const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const TimeSlot = {
  fetchtimeslotData: async (token, requestBody) => {
    const req = {
      tourId: requestBody.tourId,
      contractId: requestBody.contractId,
      travelDate: requestBody.travelDate,
      tourOptionId: requestBody.tourOptionId,
      transferId: requestBody.transferId,
    };
    console.log(req);
    if (!requestBody.isVendor) {
      try {
        const timeslotresponse = await axios.post(
          "https://sandbox.raynatours.com/api/Tour/timeslot",
          req, // Include the request body data in the POST request
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", // Specify the content type of the request body
            },
          }
        );

        // Log the response data if needed

        return timeslotresponse.data;
      } catch (error) {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the controller
      }
    } else {
      try {
        const timeslot = await prisma.TimeSlot.findMany({
          where: {
            tourOptionId: requestBody.tourOptionId,
          },
        });

        return { result: timeslot };
      } catch (error) {
        console.log(error);
      }
      console.log("its not a valid api");
      return { message: "its not a valid api" };
    }
  },
};

module.exports = TimeSlot;
