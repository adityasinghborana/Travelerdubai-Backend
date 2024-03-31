const Touroption = require("../model/touroptions");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const Optioncontroller = {
  async fetchoptions(req, res) {
    try {
      const token = await prisma.rayanaApi.findFirst();

      const requestBodyData = req.body;
      console.log(requestBodyData);

      const optiondata = await Touroption.fetchData(token, requestBodyData);

      res.json(optiondata);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred while fetching data" });
    }
  },
};

module.exports = Optioncontroller;
