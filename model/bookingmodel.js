const axios = require('axios');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const BookingModel = {



  bookTours: async (token, cartId, uid,pickup,passengersFromFrontend) => {
    try {

        let isUniqueId = false;
        let randomid;

        // Keep generating a new randomid until a unique one is found
        while (!isUniqueId) {
          randomid = Math.floor(100000 + Math.random() * 900000);
      
          // Check if randomid is not present in CartTourDetail
          const existingRecord = await prisma.cartTourDetail.findUnique({
              where: {
                id: randomid,
                  serviceUniqueId: randomid,
              },
          });
      
          if (!existingRecord) {
              isUniqueId = true;
          }
      }



        
      // Fetch Cart details from Prisma based on the cartId
      const Cart = await prisma.cartTourDetail.findMany({
        where: { cartId: cartId },
       
      })
     

      const tourDetailsArray = Cart.map(cart => cart);
      // Extract relevant data from the fetched cartDetails
      console.log(tourDetailsArray);

      // If you want to flatten the array to have all TourDetails in a single array, you can use flat()
      const flattenedTourDetails = tourDetailsArray.flat();
      console.log(flattenedTourDetails);
      flattenedTourDetails.forEach((tourDetail) => {
        tourDetail.pickup = pickup;
      });

    

      const bookingData = {
        "uniqueNo": randomid,
        "TourDetails": flattenedTourDetails,
        "passengers": passengersFromFrontend,
      };
    

      const bookingResponse = await axios.post(
        "https://sandbox.raynatours.com/api/Booking/bookings",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Log the response data if needed
      console.log('Booking API Response:', bookingResponse.data);
      await saveBookingDetails(bookingResponse.data.result , uid);
      // Return the response data
      return bookingResponse.data;
    } catch (error) {

     
      console.error('Error:', error);
      throw error;
    }


    
  },
 
};


async function saveBookingDetails(responseData, userId) {
    try {
      const { details, referenceNo } = responseData;
  
      // Create a new BookingResult record
      const bookingResult = await prisma.bookingResult.create({
        data: {
          referenceNo: referenceNo,
          userId: userId,
        },
      });
  
      // Create BookingDetail records and associate them with the BookingResult
      for (const detail of details) {
        await prisma.bookingDetail.create({
          data: {
            status: detail.status,
            bookingId: detail.bookingId,
            downloadRequired: detail.downloadRequired,
            serviceUniqueId: detail.serviceUniqueId,
            serviceType: detail.servicetype,
            confirmationNo: detail.confirmationNo,
            bookingResult: {
              connect: { referenceNo: bookingResult.referenceNo },
            },
          },
        });
      }
  
      console.log('Data saved successfully!');
    } catch (error) {
      console.error('Error:', error);
    }
  }

module.exports = BookingModel;