const axios = require("axios");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const BookingModel = {
  bookTours: async (token, cartId, uid, pickup, passengersFromFrontend) => {
    try {
      let isUniqueId = false;
      let randomid;

      // Keep generating a new randomid until a unique one is found
      while (!isUniqueId) {
        randomid = Math.floor(100000 + Math.random() * 900000);

        // Check if randomid is not present in CartTourDetail
        const existingRecord = await prisma.cartTourDetail.findUnique({
          where: { id: randomid },
        });

        if (!existingRecord) {
          isUniqueId = true;
        }
      }

      // Fetch Cart details from Prisma based on the cartId
      const Cart = await prisma.cartTourDetail.findMany({
        where: { cartId: cartId },
      });

      // Separate the Cart items based on whether roleId is null or not
      const toursWithNullrole = Cart.filter((cart) => !cart.roleId);
      const toursWithrole = Cart.filter((cart) => cart.roleId);

      // Log the separated tours
      console.log("Tours with null roleId:", toursWithNullrole);
      console.log("Tours with roleId:", toursWithrole);

      // Create booking data for tours with null roleId
      const nullroleBookingData = {
        uniqueNo: randomid,
        TourDetails: toursWithNullrole.map((cart) => ({
          ...cart,
          pickup: pickup,
        })),
        passengers: passengersFromFrontend,
      };
      const cartdetail = {
        cartdata: toursWithNullrole.map((cart) => ({
          ...cart,
          pickup: pickup,
        })),
      };
      console.log(cartdetail.adult);
      // Make booking API call for tours with null roleId if there are any
      let nullroleBookingResponse;
      if (toursWithNullrole.length > 0) {
        nullroleBookingResponse = await axios.post(
          "https://sandbox.raynatours.com/api/Booking/bookings",
          nullroleBookingData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Log the response data if needed
        console.log(
          "Null role Booking API Response:",
          nullroleBookingResponse.data
        );
        await saveBookingDetails(
          nullroleBookingResponse.data.result,
          uid,
          passengersFromFrontend,
          cartdetail.cartdata
        );
      }

      // Handle tours with non-null roleId
      if (toursWithrole.length > 0) {
        // Create booking data for tours with non-null roleId
        const roleBookingData = {
          uniqueNo: randomid,
          TourDetails: toursWithrole.map((cart) => ({
            ...cart,
            pickup: pickup,
          })),
          passengers: passengersFromFrontend,
        };

        // Ensure bookingResult exists before creating BookingDetails
        const bookingResult = await prisma.bookingResult.create({
          data: {
            referenceNo: randomid.toString(),
            userId: uid,
          },
        });

        // Log the created bookingResult
        console.log("Created bookingResult:", bookingResult);

        // Make booking API call for tours with non-null roleId if there are any
        const bookingDetailsData = passengersFromFrontend.flatMap(
          (passenger, passengerIndex) =>
            toursWithrole.map((tour, tourIndex) => ({
              prefix: passenger.prefix,
              firstName: passenger.firstName,
              lastName: passenger.lastName,
              email: passenger.email,
              mobile: passenger.mobile,
              nationality: passenger.nationality,
              message: passenger.message,
              adult: tour.adult,
              tourname: tour.tourname,
              child: tour.child,
              pickup: tour.pickup,
              infant: tour.infant,
              tourDate: tour.tourDate,
              tourOption: tour.tourOption,
              timeSlotId: tour.timeSlotId,
              startTime: tour.startTime,
              serviceTotal: tour.serviceTotal,
              status: "Pending",
              bookingId: randomid * 1000 + tourIndex, // Generate unique bookingId
              downloadRequired: false,
              serviceUniqueId: "td" + tour.serviceUniqueId,
              servicetype: "Tour",
              confirmationNo: null,
              bookingResultId: bookingResult.id, // Use the created bookingResult ID
            }))
        );

        // Log the data to be inserted
        console.log("BookingDetailsData:", bookingDetailsData);

        try {
          const roleBookingResponse = await prisma.bookingDetail.createMany({
            skipDuplicates: true,
            data: bookingDetailsData,
          });

          // Log the response data if needed
          console.log("Role Booking Database Response:", roleBookingResponse);

          await saveBookingDetails(
            { details: bookingDetailsData, referenceNo: randomid.toString() },
            uid
          );

          // Return the response data
          return {
            Data: nullroleBookingResponse?.data,
            vendorbookings: {
              status: 200,
              count: roleBookingResponse.count,
              bookingDetails: bookingDetailsData,
            },
          };
        } catch (error) {
          console.error("Error creating booking details:", error);
          // Return an error response or handle the error as needed
          return {
            error: "Failed to create booking details.",
          };
        }
      } else {
        return {
          Data: nullroleBookingResponse?.data,
          vendorbookings: {
            status: 200,
            count: 0,
            bookingDetails: [],
          },
        };
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  /// other apis models
  async getAllBookings() {
    const bookings = await prisma.bookingDetail.findMany({
      include: {
        bookingResult: true,
      },
    });
    return bookings;
  },

  async getBookingsDetails(bookingid) {
    try {
      const bookings = await prisma.bookingDetail.findUnique({
        where: {
          bookingId: bookingid,
        },
        include: {
          bookingResult: {
            include: {
              user: true,
            },
          },
        },
      });
      return bookings;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async getBookingResultsByUser(userId) {
    try {
      const bookingResults = await prisma.bookingResult.findMany({
        where: {
          userId: userId,
        },
        include: {
          user: true,
          bookingDetails: true,
        },
      });
      return bookingResults;
    } catch (error) {
      console.error("Error fetching booking results:", error);
      throw new Error("Error fetching booking results");
    }
  },
};

async function saveBookingDetails(responseData, userId, passenger, cartdata) {
  //console.log({ result: passenger[0].lastName, time: "hello" });
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
    for (let i = 0; i < details.length; i++) {
      const detail = details[i];
      const cart = cartdata[i]; // Assuming cartdata and details arrays have the same length and order

      await prisma.bookingDetail.create({
        data: {
          prefix: passenger[i]?.prefix || cart.prefix, // Fallback to cart property if passenger[i] is undefined
          firstName: passenger[i]?.firstName || cart.firstName,
          lastName: passenger[i]?.lastName || cart.lastName,
          email: passenger[i]?.email || cart.email,
          mobile: passenger[i]?.mobile || cart.mobile,
          nationality: passenger[i]?.nationality || cart.nationality,
          message: passenger[i]?.message || cart.message,
          status: detail.status,
          bookingId: detail.bookingId,
          downloadRequired: detail.downloadRequired,
          serviceUniqueId: detail.serviceUniqueId,
          servicetype: detail.servicetype,
          confirmationNo: detail.confirmationNo,
          bookingResultId: bookingResult.id,
          // Additional cartdata properties if needed
          adult: cart.adult,
          child: cart.child,
          pickup: cart.pickup,
          infant: cart.infant,
          tourDate: cart.tourDate,
          tourOption: cart.tourOption,
          timeSlotId: cart.timeSlotId,
          startTime: cart.startTime,
          serviceTotal: cart.serviceTotal,
        },
      });
    }

    console.log("Data saved successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = BookingModel;
