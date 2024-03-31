const BookingModel = require("../model/bookingmodel");

const Bookingcontroller = {
  async book(req, res) {
    try {
      const token =
        "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNWU4YWZhMC1mNGJhLTQ2NWUtYTAzOS1mZGJiYzMxZWZlZGUiLCJVc2VySWQiOiIzNzU0NSIsIlVzZXJUeXBlIjoiQWdlbnQiLCJQYXJlbnRJRCI6IjAiLCJFbWFpbElEIjoidHJhdmVsZ2F0ZXhAcmF5bmF0b3Vycy5jb20iLCJpc3MiOiJodHRwOi8vcmF5bmFhcGkucmF5bmF0b3Vycy5jb20iLCJhdWQiOiJodHRwOi8vcmF5bmFhcGkucmF5bmF0b3Vycy5jb20ifQ.i6GaRt-RVSlJXKPz7ZVx-axAPLW_hkl7usI_Dw8vP5w"; // Replace with your actual Bearer token
      const { cartId, User, passengers, pickup } = req.body;

      // Assuming your parameter is cartId
      const bookingdata = await BookingModel.bookTours(
        token,
        cartId,
        User,
        pickup,
        passengers
      );

      res.json(bookingdata);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred while fetching data" });
    }
  },
};

module.exports = Bookingcontroller;
