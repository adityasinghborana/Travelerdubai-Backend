const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const priceModel = require("./pricemodel");

const prisma = new PrismaClient();

const cityModel = {
  async fetchCountriesAndCities(token) {
    // format date

    function formatDate(date) {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();
      return `${month}/${day}/${year}`;
    }
    const currentDate = new Date(); // Get the current date
    const formattedDate = formatDate(currentDate); // Format the date

    try {
      // Step 1: Fetch countries if needed (as this website is for UAE only)

      // Step 2: Fetch cities for a specific country (e.g., using the first country ID)
      const citiesData = {
        CountryId: "13063", // Use the appropriate country ID from the fetched list
      };

      const citiesResponse = await axios.post(
        "https://sandbox.raynatours.com/api/Tour/cities",
        citiesData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const cities = citiesResponse.data;

      // Prepare cities data to be saved in the database
      const citiesToSave = cities.result.map((city) => ({
        CityId: city.cityId,
        CityName: city.cityName,
      }));

      //Save fetched cities to the database using Prisma
      const createdCities = await prisma.city.createMany({
        data: citiesToSave,
        skipDuplicates: true, // Optionally skip adding duplicates
      });

      // Get all saved cities from the database
      const savedCities = await prisma.city.findMany();

      // Fetch tours for each saved city
      const tours = [];
      for (const city of savedCities) {
        try {
          const cityTourData = {
            countryId: "13063", // Use the appropriate country ID
            cityId: city.CityId, // Use the saved CityId for the request
            // Add other required data for the tour request
          };

          // Make the API call to fetch tours for this city
          const tourResponse = await axios.post(
            "https://sandbox.raynatours.com/api/Tour/tourstaticdata",
            cityTourData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const cityTours = tourResponse.data.result;

          if (Array.isArray(cityTours)) {
            for (const tour of cityTours) {
              const tourDataToSave = {
                tourId: tour.tourId,
                countryId: tour.countryId,
                countryName: tour.countryName,
                cityId: tour.cityId,
                cityName: tour.cityName,
                tourName: tour.tourName,
                duration: tour.duration,
                imagePath: tour.imagePath,
                cityTourTypeId: tour.cityTourTypeId,
                cityTourType: tour.cityTourType,
                contractId: tour.contractId,
                recommended: tour.recommended,
                isPrivate: tour.isPrivate,
                isSlot: tour.isSlot,
              };

              // Save each tour data entry into the 'Tourstaticdata' model using Prisma
              await prisma.Tourstaticdata.createMany({
                skipDuplicates: true,
                data: tourDataToSave,
              });
              await prisma.Tourtypes.createMany({
                skipDuplicates: true,
                data: {
                  cityTourType: tour.cityTourType,
                },
              });

              // Process tour data and save using Prisma
            }
          }
        } catch (error) {
          console.error(
            `An error occurred while fetching or saving tour data for cityId: ${city.CityId}`,
            error
          );
          // Handle the error based on your application's needs
        }
      }

      // Processing for savedTourstaticdata and tour options
      const savedTourstaticdata = await prisma.Tourstaticdata.findMany();

      for (const tourdata of savedTourstaticdata) {
        try {
          const TourstaticData = {
            countryId: "13063", // Use the appropriate country ID
            cityId: tourdata.cityId, // Use the saved CityId for the request
            tourId: tourdata.tourId,
            contractId: tourdata.contractId,
            travelDate: formattedDate, // Assign the formatted date to travelDate
          };
          // ... (unchanged code for processing tour data)

          const tourstaticdatabyidresponse = await axios.post(
            "https://sandbox.raynatours.com/api/Tour/tourStaticDataById",
            TourstaticData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const staticdatabyid = tourstaticdatabyidresponse.data.result;

          try {
            if (Array.isArray(staticdatabyid)) {
              for (const staticdata of staticdatabyid) {
                const tourDatastaticdatabyidToSave = {
                  TourId: staticdata.tourId,
                  countryId: staticdata.countryId,
                  countryName: staticdata.countryName,
                  cityId: staticdata.cityId,
                  cityName: staticdata.cityName,
                  tourName: staticdata.tourName,
                  duration: staticdata.duration,
                  imagePath: staticdata.imagePath,
                  cityTourTypeId: staticdata.cityTourTypeId,
                  cityTourType: staticdata.cityTourType,
                  tourDescription: staticdata.tourDescription,
                  tourInclusion: staticdata.tourInclusion,
                  tourShortDescription: staticdata.tourShortDescription,
                  importantInformation: staticdata.importantInformation,
                  itenararyDescription: staticdata.itenararyDescription,
                  usefulInformation: staticdata.usefulInformation,
                  childAge: staticdata.childAge,
                  infantAge: staticdata.infantAge,
                  infantCount: staticdata.infantCount,
                  isSlot: staticdata.isSlot,
                  onlyChild: staticdata.onlyChild,
                  contractId: staticdata.contractId,
                  startTime: staticdata.startTime,
                  meal: staticdata.meal || null,

                  googleMapUrl: staticdata.googleMapUrl || null,
                  tourExclusion: staticdata.tourExclusion || null,
                };

                // Save each tour data entry into the 'Tourstaticdata' model using Prisma
                await prisma.Tourstaticdatabyid.createMany({
                  skipDuplicates: true,
                  data: tourDatastaticdatabyidToSave,
                });

                // for getting tourimages
                const tourImages = staticdata.tourImages; // Access images for this tour

                if (Array.isArray(tourImages)) {
                  for (const image of tourImages) {
                    const tourDatastaticdatabyidimages = {
                      tourId: staticdata.tourId, // Using the tourId from the current tour
                      imagePath: image.imagePath,
                    };

                    await prisma.TourImagess.createMany({
                      skipDuplicates: true,
                      data: tourDatastaticdatabyidimages,
                    });
                  }
                }
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
      }

      //for touroptions id
      const savedTourstaticdata1 = await prisma.Tourstaticdata.findMany();
      for (const tourdata of savedTourstaticdata1) {
        try {
          const TourstaticData = {
            tourId: tourdata.tourId,
            contractId: tourdata.contractId,
          };
          // ... (unchanged code for processing tour data)

          const touroptionstaticdataresponse = await axios.post(
            "https://sandbox.raynatours.com/api/Tour/touroptionstaticdata",
            TourstaticData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const optionstaticdata =
            touroptionstaticdataresponse.data.result.touroption;

          try {
            if (Array.isArray(optionstaticdata)) {
              for (const staticdata of optionstaticdata) {
                const touroptionstaticdataToSave = {
                  tourId: staticdata.tourId,
                  tourOptionId: staticdata.tourOptionId,
                  optionName: staticdata.optionName,
                  childAge: staticdata.childAge,
                  infantAge: staticdata.infantAge,
                  optionDescription: staticdata.optionDescription,
                  minPax: staticdata.minPax,
                  maxPax: staticdata.maxPax,
                  duration: staticdata.duration,
                };

                // Save each tour data entry into the 'Tourstaticdata' model using Prisma
                try {
                  await prisma.TourOption.createMany({
                    skipDuplicates: true,
                    data: touroptionstaticdataToSave,
                  });
                  console.log("its Working");
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
      } // tour option ending

      //for tourpricing
      const savedTourstaticdata21 = await prisma.Tourstaticdata.findMany();
      console.log(savedTourstaticdata21[0]);
      for (const tourdata of savedTourstaticdata21) {
        try {
          const TourstaticData = {
            countryId: tourdata.countryId,
            cityId: tourdata.cityId,
            travelDate: formattedDate,
          };

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
                  console.log("Hurray price is added");
                  console.log(tourpriceToSave);
                } catch (error) {
                  console.error("Error occurred while saving price", error);
                  // Handle the error according to your application needs
                }
                // prisma ends
              }
            }
          } catch (error) {
            console.error("An error occurred while saving price", error);
            // Handle the error based on your application's needs
          }
        } catch (error) {
          console.error(
            `An error occurred while fetching or saving tour price for loop}`,
            error
          );
          // Handle the error based on your application's needs
        }
      }
      //tour pricing ending
    } catch (error) {
      console.error("An error occurred while fetching or saving data:", error);
      throw new Error("An error occurred while fetching or saving data");
    } // this block is for wholecitymodel
  },
};

module.exports = cityModel;
