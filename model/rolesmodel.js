const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const RolesModel = {
  async FetchVendor(reqbody) {
    const singleVendor = await prisma.roles.findFirst({
      where: {
        uid: reqbody.uid,
        
      },
    });
    return singleVendor;
  },

  async FetchAllVendors() {
    await prisma.roles.findMany();
  },

  async  vendorSignup(vendordata) {
    try {
      await prisma.roles.create({
        data: {
          uid: vendordata.uid,
          username: vendordata.username,
          isAdmin: vendordata.isAdmin,
          isVendor: vendordata.isVendor,
          email: vendordata.email,
          address: vendordata.address,
          age: vendordata.age,
          name: vendordata.name,
          license_number: vendordata.license_number,
          country: vendordata.country,
          city: vendordata.city,
          services_description: vendordata.services_description,
          mobile: vendordata.mobile,
          document_tradelicense: vendordata.document_tradelicense,
          document_other: vendordata.document_other,
          created_at: new Date() // You can omit this if you want to use the default value
        },
      });
      console.log('Vendor signed up successfully');
    } catch (error) {
      console.error('Error signing up vendor:', error);
    }
  }
};
module.exports = RolesModel;