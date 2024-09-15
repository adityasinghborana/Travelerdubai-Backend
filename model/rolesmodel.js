const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const RolesModel = {
  async FetchVendor(reqbody) {
    const singleVendor = await prisma.roles.findFirst({
      where: {
        uid: reqbody.uid,
      },
      include: {
        tours: true,
      },
    });
    return singleVendor;
  },

  async FetchAllVendors() {
    return await prisma.Roles.findMany();
  },
  async updateVendorInDB(vendordata) {
    try {
      const data = await prisma.roles.update({
        where: {
          uid: vendordata.uid,
        },
        data: {
          isApproved: vendordata.status,
        },
      });

      // Return the updated data if successful
      return { success: true, data };
    } catch (error) {
      // Return the error if something goes wrong
      return { success: false, error: error.message };
    }
  },

  async vendorSignup(vendordata) {
    try {
      const vendor = await prisma.roles.create({
        data: {
          uid: vendordata.uid,
          username: vendordata.username,
          isAdmin: vendordata.isAdmin,
          isVendor: vendordata.isVendor,
          email: vendordata.email,
          address: vendordata.address,
          isApproved: false,
          age: vendordata.age,
          name: vendordata.name,
          license_number: vendordata.license_number,
          country: vendordata.country,
          city: vendordata.city,
          services_description: vendordata.services_description,
          mobile: vendordata.mobile,
          document_tradelicense: vendordata.document_tradelicense,
          document_other: vendordata.document_other,
          vatDocument: vendordata.document_vat,
          bankDocument: vendordata.document_bank,
          created_at: new Date(), // You can omit this if you want to use the default value
        },
      });
      return { success: true, vendor };
    } catch (error) {
      return {
        success: false,
        message: "Error signing up vendor",
        error: error.message,
      };
    }
  },
};
module.exports = RolesModel;
