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
};
module.exports = couponModel;
