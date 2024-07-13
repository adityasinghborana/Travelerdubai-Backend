const paymentModel = require("../model/stripe");

async function handleCreatePaymentIntent(req, res) {
  try {
    const { UserId } = req.body;
    console.log(UserId);
    const clientSecret = await paymentModel.createPaymentIntent(UserId);
    res.json({ clientSecret });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = {
  handleCreatePaymentIntent,
};
