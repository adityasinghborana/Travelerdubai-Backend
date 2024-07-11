const axios = require("axios");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const priceModel = {
  async fetchprice(token) {
    // use this to delete all//
    //await prisma.tourPricing.deleteMany();

    // format date

    function formatDate(date) {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();
      return `${month}/${day}/${year}`;
    }
    const currentDate = new Date(); // Get the current date
    const formattedDate = formatDate(currentDate); // Format the date

    //for tourpricing
    const savedTourstaticdata2 = await prisma.Tourstaticdata.findMany();

    for (const tourdata of savedTourstaticdata2) {
      try {
        const TourstaticData = {
          countryId: tourdata.countryId,
          cityId: tourdata.cityId,
          travelDate: formattedDate,
        };

        // ... (unchanged code for processing tour data)

        const tourpriceresponse = await axios.post(
          "https://sandbox.raynatours.com/api/Tour/tourlist",
          TourstaticData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const tourprice = tourpriceresponse.data.result;

        console.log(TourstaticData);

        try {
          if (Array.isArray(tourprice)) {
            for (const price of tourprice) {
              const tourpriceToSave = {
                tourId: price.tourId,
                contractId: price.contractId,
                amount: price.amount,
                discount: price.discount,
              };

              // Save each tour data entry into the 'Tourstaticdata' model using Prisma
              try {
                await prisma.tourPricing.createMany({
                  skipDuplicates: true,

                  data: tourpriceToSave,
                });
                console.log("Hurray price is added from price model ");
                console.log(tourpriceToSave);
              } catch (error) {
                console.error(
                  "Error occurred while saving TourOptionstaticdata:",
                  error
                );
                // Handle the error according to your application needs
              }
              // prisma ends
            }
          }
        } catch (error) {
          console.error(
            "An error occurred while saving tourstaticdatabyid data:",
            error
          );
          // Handle the error based on your application's needs
        }
      } catch (error) {
        console.error(
          `An error occurred while fetching or saving tour data for cityId: ${tourdata.cityId}`,
          error
        );
        // Handle the error based on your application's needs
      }
    } // tour pricing ending
  },
  catch(error) {
    console.error("hello ", error);
  },
};
module.exports = priceModel;
