const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ApiModel = {
  async getRayanaApiKey() {
    try {
      const apiKey = await prisma.rayanaApi.findFirst();
      console.log(apiKey);
      return apiKey;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while fetching API key");
    }
  },
  async updateRayanaApiKey(key) {
    try {
      const apiKey = await prisma.rayanaApi.update({
        where: {
          id: key.id,
        },
        data: {
          apikey: key.apikey,
        },
      });
      console.log("updated api key ");
      return apiKey;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while updating API key");
    }
  },
  async getStripeSecretApiKey() {
    try {
      const apiKey = await prisma.rayanaApi.findFirst();
      console.log(apiKey);
      return apiKey;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while fetching API key");
    }
  },
  async updateStripeSecretApiKey(key) {
    try {
      const apiKey = await prisma.rayanaApi.update({
        where: {
          id: key.id,
        },
        data: {
          apikey: key.apikey,
        },
      });
      console.log("updated api key ");
      return apiKey;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while updating API key");
    }
  },
};

module.exports = ApiModel;
