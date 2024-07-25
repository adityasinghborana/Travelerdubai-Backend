const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const couponModel = {
  async getCoupon() {
    try {
      const data = await prisma.coupon.findMany();
      if (!data || data.length === 0) {
        return "no coupons";
      } else {
        return data;
      }
    } catch (error) {
      return "An error occurred while fetching coupons";
    }
  },
  async createCoupon(couponbody) {
    couponData = await prisma.coupon.create({
      data: {
        name: couponbody.name,
        discount: couponbody.discount,
        type: couponbody.type,
        eventId: couponbody.eventid,
        tourId: couponbody.tourid,
      },
    });
    return couponData;
  },

  async DeleteCoupon(couponbody) {
    couponData = await prisma.coupon.delete({
      where: {
        id: couponbody.id,
      },
    });
    return couponData;
  },
  async checkCoupon(couponbody) {
    try {
      const couponData = await prisma.coupon.findUnique({
        where: {
          name: couponbody.name,
        },
      });

      if (couponData != null && couponData.tourId == null) {
        const cartData = await prisma.cart.findUnique({
          where: {
            id: couponbody.cartId,
          },
        });

        if (!cartData) {
          throw new Error("Cart not found");
        }

        console.log("Cart data:", cartData);

        let newprice;
        if (couponData.type === "flat") {
          newprice = cartData.totalamount - couponData.discount;
        } else {
          newprice =
            cartData.totalamount -
            (cartData.totalamount / 100) * couponData.discount;
        }

        const updatedCart = {
          error: null,
          discountprice: newprice,
        };

        return updatedCart;
      } else if (couponData != null && couponData.tourId != null) {
        const cartTourDetails = await prisma.cartTourDetail.findMany({
          where: {
            cartId: couponbody.cartId,
          },
        });

        const tourIds = cartTourDetails.map((item) => item.tourId);

        if (tourIds.includes(couponData.tourId)) {
          const cartData = await prisma.cart.findUnique({
            where: {
              id: couponbody.cartId,
            },
          });

          if (!cartData) {
            throw new Error("Cart not found");
          }

          console.log("Cart data:", cartData);

          let newprice;
          if (couponData.type === "flat") {
            newprice = cartData.totalamount - couponData.discount;
          } else {
            newprice =
              cartData.totalamount -
              (cartData.totalamount / 100) * couponData.discount;
          }

          const updatedCart = {
            error: null,
            discountprice: newprice,
          };

          return updatedCart;
        } else {
          return {
            error: "Coupon not applicable to any tour in the cart.",
            discountprice: 0,
          };
        }
      } else {
        return { error: "Coupon not found.", discountprice: 0 };
      }
    } catch (error) {
      console.error("Error checking coupon:", error);
      return {
        error: "An error occurred while checking the coupon",
        details: error.message,
      };
    }
  },
};
module.exports = couponModel;
