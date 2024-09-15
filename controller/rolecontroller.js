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
  async updateVendor(req, res) {
    const vendordata = req.body;

    // Call the update function from the service
    const result = await RoleModel.updateVendorInDB(vendordata);

    // Send response based on the result
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json({ success: false, message: result.error });
    }
  },

  async signupVendor(req, res) {
    const data = req.body;
    const signUpData = await RoleModel.vendorSignup(data);
    if (signUpData.success) {
      return res.status(201).json({ success: true, data: signUpData.vendor });
    } else {
      return res.status(500).json({
        success: false,
        message: signUpData.message,
        error: signUpData.error,
      });
    }
  },
};
module.exports = RoleController;
