const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const couponModel = {

    async getCoupon (){

    },
    async createCoupon (couponbody){
couponData = await prisma.coupon.create(
    {
     data :{
        name:couponbody.name,
        discount:couponbody.discount
     }   
    }
);
    },
};