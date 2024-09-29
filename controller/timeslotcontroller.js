const TimeSlot = require("../model/timeslots");

const TimeSlotcontroller = {
  async fetchtimeslots(req, res) {
    try {
      const token =
        "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNWU4YWZhMC1mNGJhLTQ2NWUtYTAzOS1mZGJiYzMxZWZlZGUiLCJVc2VySWQiOiIzNzU0NSIsIlVzZXJUeXBlIjoiQWdlbnQiLCJQYXJlbnRJRCI6IjAiLCJFbWFpbElEIjoidHJhdmVsZ2F0ZXhAcmF5bmF0b3Vycy5jb20iLCJpc3MiOiJodHRwOi8vcmF5bmFhcGkucmF5bmF0b3Vycy5jb20iLCJhdWQiOiJodHRwOi8vcmF5bmFhcGkucmF5bmF0b3Vycy5jb20ifQ.i6GaRt-RVSlJXKPz7ZVx-axAPLW_hkl7usI_Dw8vP5w"; // Replace with your actual Bearer token

      const requestBodyData = req.body;
      console.log(requestBodyData);

      const optiondata = await TimeSlot.fetchtimeslotData(
        token,
        requestBodyData
      );

      res.json(optiondata);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred while fetching data" });
    }
  },
  async updateAvailability(req, res) {
    try {
      requestdata = req.body;

      // Call the service function to update availability
      const data = await TimeSlot.updateAvailability(requestdata);

      console.log(data);
      res.status(201).json({
        result: data,
      });
    } catch (error) {
      // Handle any errors that occur
      res.status(500).json({
        message: "Error updating availability",
        error: error.message,
      });
    }
  },
};

module.exports = TimeSlotcontroller;
