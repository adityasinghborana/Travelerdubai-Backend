const Touroption = require("../model/touroptions");

const staticOptioncontroller = {
  async fetchoptions(req, res) {
    try {
      const requestBody = req.body;
      console.log(requestBody);

      const staticOptionData = await Touroption.fetchstaticData(requestBody);
      console.log(staticOptionData);
      res.json(staticOptionData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred while fetching data" });
    }
  },
};

module.exports = staticOptioncontroller;
