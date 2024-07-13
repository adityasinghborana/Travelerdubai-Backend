const axios = require("axios");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const Touroption = {
  fetchData: async (token, requestBodyData) => {
    if (!requestBodyData.isVendor) {
      const api = await prisma.rayanaApi.findFirst();
      const key = api
        ? api.apikey
        : "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNWU4YWZhMC1mNGJhLTQ2NWUtYTAzOS1mZGJiYzMxZWZlZGUiLCJVc2VySWQiOiIzNzU0NSIsIlVzZXJUeXBlIjoiQWdlbnQiLCJQYXJlbnRJRCI6IjAiLCJFbWFpbElEIjoidHJhdmVsZ2F0ZXhAcmF5bmF0b3Vycy5jb20iLCJpc3MiOiJodHRwOi8vcmF5bmFhcGkucmF5bmF0b3Vycy5jb20iLCJhdWQiOiJodHRwOi8vcmF5bmFhcGkucmF5bmF0b3Vycy5jb20ifQ.i6GaRt-RVSlJXKPz7ZVx-axAPLW_hkl7usI_Dw8vP5w"; // Use a default key or handle missing API key
      console.log(requestBodyData.isVendor);

      try {
        const touroptionresponse = await axios.post(
          "https://sandbox.raynatours.com/api/Tour/touroption",
          requestBodyData, // Include the request body data in the POST request
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", // Specify the content type of the request body
            },
          }
        );

        const tourId = parseInt(requestBodyData.tourId, 10);
        const adult = parseInt(requestBodyData.noOfAdult, 10);
        const children = parseInt(requestBodyData.noOfChild, 10);
        const infant = parseInt(requestBodyData.noOfInfant, 10);

        // Log the response data if needed
        const prismaData = await prisma.TourPricing.findUnique({
          where: {
            tourId: tourId,
          },
        });

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
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the controller
      }
    } else {
      const adult = parseInt(requestBodyData.noOfAdult, 10);
      const children = parseInt(requestBodyData.noOfChild, 10);
      const infant = parseInt(requestBodyData.noOfInfant, 10);
      try {
        const tourIdint = parseInt(requestBodyData.tourId, 10);
        const data = await prisma.TourOption.findMany({
          where: {
            tourId: tourIdint,
          },
        });
        const price = await prisma.TourPricing.findUnique({
          where: {
            tourId: tourIdint,
          },
        });

        const finalPrice =
          price.adultPrice * adult +
          price.childPrice * children +
          price.infantPrice * infant;

        // Generate variations based on prisma data
        const variations = data
          .map((option) => {
            const result = [];

            // Without Transfers
            result.push({
              tourId: option.tourId,
              tourOptionId: option.id,
              transferId: 41865,
              transferName: "Without Transfers",
              adultPrice: price.adultPrice,
              childPrice: price.childPrice,
              infantPrice: price.infantPrice,
              finalAmount: finalPrice,
              startTime: "",
            });

            // Sharing Transfers
            if (option.isSharingTransfer) {
              result.push({
                tourId: option.tourId,
                tourOptionId: option.id,
                transferId: 41843,
                transferName: "Sharing Transfer",
                adultPrice: price.adultPrice,
                childPrice: price.childPrice,
                infantPrice: price.infantPrice,
                finalAmount: finalPrice,
                startTime: "",
              });
            }

            // Private Transfers
            if (option.isPrivateTransfer) {
              result.push({
                tourId: option.tourId,
                tourOptionId: option.id,
                transferId: 41844,
                transferName: "Private Transfer",
                adultPrice: price.adultPrice,
                childPrice: price.childPrice,
                infantPrice: price.infantPrice,
                finalAmount: finalPrice,
                startTime: "",
              });
            }

            // Private Boat Without Transfers
            if (option.isPrivateBoatWithoutTransfers) {
              result.push({
                tourId: option.tourId,
                tourOptionId: option.id,
                transferId: 43129,
                transferName: "Private Boat Without Transfers",
                adultPrice: price.adultPrice,
                childPrice: price.childPrice,
                infantPrice: price.infantPrice,
                finalAmount: finalPrice,
                startTime: "",
              });
            }

            // Pvt Yacht Without Transfers
            if (option.isPvtYachtWithoutTransfers) {
              result.push({
                tourId: option.tourId,
                tourOptionId: option.id,
                transferId: 43110,
                transferName: "Pvt Yacht Without Transfer",
                adultPrice: price.adultPrice,
                childPrice: price.childPrice,
                infantPrice: price.infantPrice,
                finalAmount: finalPrice,
                startTime: "",
              });
            }

            return result;
          })
          .flat();

        console.log("Vendor request, no API call made");
        return {
          extractedData: {
            addPriceAdult: 0,
            addPriceChildren: 0,
            additionalPriceInfant: 0,
          },
          apiResponseData: { result: variations },
        };
      } catch (error) {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the controller
      }
    }
  },

  fetchstaticData: async (requestBody) => {
    if (!requestBody.isVendor) {
      const api = await prisma.rayanaApi.findFirst();
      key =
        "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNWU4YWZhMC1mNGJhLTQ2NWUtYTAzOS1mZGJiYzMxZWZlZGUiLCJVc2VySWQiOiIzNzU0NSIsIlVzZXJUeXBlIjoiQWdlbnQiLCJQYXJlbnRJRCI6IjAiLCJFbWFpbElEIjoidHJhdmVsZ2F0ZXhAcmF5bmF0b3Vycy5jb20iLCJpc3MiOiJodHRwOi8vcmF5bmFhcGkucmF5bmF0b3Vycy5jb20iLCJhdWQiOiJodHRwOi8vcmF5bmFhcGkucmF5bmF0b3Vycy5jb20ifQ.i6GaRt-RVSlJXKPz7ZVx-axAPLW_hkl7usI_Dw8vP5w";
      console.log(requestBody.isVendor);
      console.log(key);
      try {
        const req = {
          tourId: requestBody.tourId,
          contractId: requestBody.contractId,
        };
        const touroptionstaticresponse = await axios.post(
          "https://sandbox.raynatours.com/api/Tour/touroptionstaticdata",
          req, // Include the request body data in the POST request
          {
            headers: {
              Authorization: `Bearer ${key}`,
              "Content-Type": "application/json", // Specify the content type of the request body
            },
          }
        );

        // Log the response data if needed

        return touroptionstaticresponse.data;
      } catch (error) {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the controller
      }
    } else {
      try {
        const tourIdint = parseInt(requestBody.tourId, 10);
        const data = await prisma.TourOption.findMany({
          where: {
            tourId: tourIdint,
          },
          include: {
            operationDays: true,
          },
        });

        return {
          error: null,
          statuscode: 200,
          result: { touroption: data, specialdates: [], transfertime: [] },
        };
      } catch (error) {}
    }
  },
};

module.exports = Touroption;
