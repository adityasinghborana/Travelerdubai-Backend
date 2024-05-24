const RoleModel = require("../model/rolesmodel");

const RoleController = {
  async fetchAllVendor(req, res) {
    const vendorsData = await RoleModel.FetchAllVendors;
    return res.json({
      data: vendorsData,
    });
  },

  async signupVendor(req , res){
    req.
    const
  }
};
module.exports = RoleController;
