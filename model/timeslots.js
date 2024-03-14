const axios = require('axios');
const { PrismaClient } = require("@prisma/client");

const TimeSlot = {
 

  fetchtimeslotData: async (token, requestBody) => {
    console
    try {
      const timeslotresponse = await axios.post(

        "https://sandbox.raynatours.com/api/Tour/timeslot",
        requestBody,  // Include the request body data in the POST request
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Specify the content type of the request body
          },
        }
      );

      // Log the response data if needed
    

      return timeslotresponse.data;
    } catch (error) {
      console.error('Error:', error);
      throw error; // Re-throw the error to be caught by the controller
    }
  },
};

module.exports = TimeSlot;