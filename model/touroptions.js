const axios = require('axios');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const Touroption = {
  fetchData: async (token, requestBodyData) => {
    try {
      const touroptionresponse = await axios.post(
        "https://sandbox.raynatours.com/api/Tour/touroption",
        requestBodyData,  // Include the request body data in the POST request
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Specify the content type of the request body
          },
        }
      );
      const tourId = requestBodyData.tourId;
      const adult = requestBodyData.noOfAdult;
      const children = requestBodyData.noOfChild;
      const infant = requestBodyData.noOfInfant;
      console.log(tourId);
      // Log the response data if needed
      const prismaData = await prisma.TourPricing.findUnique({
        where: {
          tourId: tourId,
        },
      });

      // Extract specific fields directly from the Prisma model
      // const extractedData = {
      //   addPriceAdult: prismaData.addPriceadult * adult,
      //   addPriceChildren: prismaData.addPricechild * children,
      //   additionalPriceInfant: prismaData.addPriceinfant * infant,
      // };
      const extractedData = {
        addPriceAdult: (prismaData?.addPriceadult ?? 0) * adult,
        addPriceChildren: (prismaData?.addPricechild ?? 0) * children,
        additionalPriceInfant: (prismaData?.addPriceinfant ?? 0) * infant,
    };

      return {
        extractedData: extractedData,
        apiResponseData: touroptionresponse.data,
      };
    } catch (error) {
      console.error('Error:', error);
      throw error; // Re-throw the error to be caught by the controller
    }
  },

  fetchstaticData: async (token, requestBody) => {
    console
    try {
      const touroptionstaticresponse = await axios.post(

        "https://sandbox.raynatours.com/api/Tour/touroptionstaticdata",
        requestBody,  // Include the request body data in the POST request
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Specify the content type of the request body
          },
        }
      );

      // Log the response data if needed
    

      return touroptionstaticresponse.data;
    } catch (error) {
      console.error('Error:', error);
      throw error; // Re-throw the error to be caught by the controller
    }
  },
};

module.exports = Touroption;