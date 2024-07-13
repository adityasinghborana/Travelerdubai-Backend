const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Cartmodel = {
  async createCart(uid) {
    try {
      // Find the user by uid
      console.log(uid.userId);
      const user = await prisma.User.findUnique({
        where: { uid: uid.userId },
      });

      // Throw an error if the user is not found
      if (!user) {
        throw new Error("User not found.");
      }

      // Create a new cart for the user
      const newCart = await prisma.Cart.create({
        data: {
          userId: uid.userId, // assuming this is a valid field in your Cart model
          totalamount: 0, // adjust accordingly based on your Cart model
          uniqueNo: 0, // adjust accordingly based on your Cart model
          // Add other fields if needed
        },
      });

      // Logic to add TourDetails to the new cart if needed

      return newCart;
    } catch (error) {
      // Catch and rethrow errors with a more descriptive message
      throw new Error(`Error creating cart: ${error.message}`);
    } finally {
      // Ensure that the Prisma client is disconnected even if an error occurs
      await prisma.$disconnect();
    }
  },
  async getCart(uid) {
    try {
      // Find the user by uid
      console.log(uid.userId);

      const Cart = await prisma.Cart.findMany({
        where: { userId: uid.userId },
        include: {
          TourDetails: true, // Assuming TourDetails is the name of the relation in your Cart model
        },
      });

      // Throw an error if the user is not found
      if (!Cart) {
        throw new Error("Cart not found.");
      }

      // Create a new cart for the user

      // Logic to add TourDetails to the new cart if needed

      return Cart;
    } catch (error) {
      // Catch and rethrow errors with a more descriptive message
      throw new Error(`Error creating cart: ${error.message}`);
    } finally {
      // Ensure that the Prisma client is disconnected even if an error occurs
      await prisma.$disconnect();
    }
  },

  async updateCartTourDetail(requestBody) {
    try {
      let isUniqueId = false;
      let randomid;

      // Keep generating a new randomid until a unique one is found
      while (!isUniqueId) {
        randomid = Math.floor(100000 + Math.random() * 900000);

        // Check if randomid is not present in CartTourDetail
        const existingRecord = await prisma.cartTourDetail.findUnique({
          where: {
            id: randomid, // Add this line to specify the id field in the where clause
            serviceUniqueId: randomid,
          },
        });

        if (!existingRecord) {
          isUniqueId = true;
        }
      }

      // Create the updated data with the provided and generated values
      const updatedData = {
        serviceUniqueId: randomid,
        tourname: requestBody.tourname,
        tourOption: requestBody.tourOption,
        tourId: requestBody.tourId,
        optionId: requestBody.optionId,
        adult: requestBody.adult,
        child: requestBody.child,
        infant: requestBody.infant,
        tourDate: requestBody.tourDate,
        timeSlotId: requestBody.timeSlotId,
        startTime: requestBody.startTime,
        transferId: requestBody.transferId,
        pickup: requestBody.pickup,
        adultRate: requestBody.adultRate,
        childRate: requestBody.childRate,
        serviceTotal: requestBody.serviceTotal,
        cartId: requestBody.cartId,
        roleId: requestBody.vendoruid,
        isVendor: requestBody.isvendor, //TODO add the vendor so that booking api can run on ryanna and on our backend
      };
      console.log(requestBody.cartId);
      // Create a new CartTourDetail with the updated data
      const createdCartTourDetail = await prisma.cartTourDetail.create({
        data: updatedData,
      });

      console.log("CartTourDetail created:", createdCartTourDetail);

      // Calculate total amount from the cartTourDetail records with the given cartId
      const cartTourDetails = await prisma.cartTourDetail.findMany({
        where: {
          cartId: requestBody.cartId,
        },
      });

      const totalServiceAmount = cartTourDetails.reduce(
        (sum, tourDetail) => sum + tourDetail.serviceTotal,
        0
      );

      // Update the Cart model with the calculated total amount
      const updatedCart = await prisma.cart.update({
        where: {
          id: requestBody.cartId,
        },
        data: {
          totalamount: totalServiceAmount,
        },
      });

      console.log("Cart updated:", updatedCart);

      return createdCartTourDetail;
    } catch (error) {
      console.error("Error creating or updating CartTourDetail:", error);
      throw error;
    }
  },

  async deleteCartdetail(cartid) {
    try {
      const Cart = await prisma.CartTourDetail.delete({
        where: { id: cartid },
      });
      // updating cart total amount
      const cartTourDetails = await prisma.cartTourDetail.findMany({
        where: {
          cartId: cartid,
        },
      });

      // Update the Cart model with the calculated total amount
      const Price = await prisma.cart.findUnique({
        where: {
          id: Cart.cartId,
        },
      });
      console.log(Price.totalamount);
      const updatedCart = await prisma.cart.update({
        where: {
          id: Cart.cartId,
        },
        data: {
          totalamount: Price.totalamount - Cart.serviceTotal,
        },
      });
      console.log("hello");
      console.log(updatedCart);
      console.log("hello");

      if (!Cart) {
        throw new Error("Cart not found.");
      }
      return Cart;
    } catch (error) {
      throw new Error(`Error deleting cart: ${error.message}`);
    } finally {
      await prisma.$disconnect();
    }
  },
};

module.exports = Cartmodel;
