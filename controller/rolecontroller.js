const RoleModel = require("../model/rolesmodel");

const RoleController = {
  async fetchAllVendor(req, res) {
    const vendorsData = await RoleModel.FetchAllVendors();
    return res.json({
      data: vendorsData,
    });
  },
  async fetchVendor(req, res) {
    const vendorId = req.body;
    try {
      const vendorData = await RoleModel.FetchVendor(vendorId);
      return res.json({
        data: vendorData,
      });
    } catch (error) {
      return res.json({
        error: "internal server error",
      });
    }
  },

  async signupVendor(req, res) {
    try {
      const data = req.body;
      const signUpData = await RoleModel.vendorSignup(data);
      res.status(201).json({
        message: "Vendor signed up successfully",
        data: signUpData,
      });
    } catch (error) {
      console.error("Error signing up vendor:", error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  },
};
module.exports = RoleController;
