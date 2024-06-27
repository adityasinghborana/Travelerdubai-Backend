const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stripe = require("stripe");

async function getStripeSecretKey() {
  try {
    const stripeApiKey = await prisma.StripeApi.findFirst();

    console.log(stripeApiKey);
    if (stripeApiKey && stripeApiKey.secretapikey) {
      return stripeApiKey.secretapikey;
    } else {
      throw new Error("Stripe secret key not found in the database");
    }
  } catch (error) {
    throw new Error(
      "Error fetching Stripe secret key from the database: " + error.message
    );
  }
}

async function getCartAmountForUser(userId) {
  try {
    const userCart = await prisma.Cart.findFirst({
      where: {
        userId: userId,
      },
    });

    if (userCart) {
      console.log(userCart.totalamount);
      return userCart.totalamount; // Adjust this based on your actual model structure
    } else {
      throw new Error("User cart not found");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving cart amount for user");
  }
}

async function createPaymentIntent(userId) {
  try {
    const amount = await getCartAmountForUser(userId);
    const stripeSecretKey = await getStripeSecretKey();
    const stripeInstance = stripe(stripeSecretKey);

    // Ensure that amount is a valid number
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      throw new Error("Invalid amount");
    }

    // Create payment intent
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: amount * 100, // Convert to fils
      currency: "AED",
    });
    console.log(paymentIntent);

    return paymentIntent.client_secret;
  } catch (error) {
    console.error(error.message);
    throw new Error("Error creating PaymentIntent");
  }
}

module.exports = {
  createPaymentIntent,
};
