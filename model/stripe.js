// const stripe = require('stripe')('sk_test_51MWclzAtjY5SrUmvw5yjKXWGqtX8X49DfAFmURNdF57xg8Kr4TYbEgC7DiCYyrlfvd6nfQ55mgtj5ksjRcMRGEpd003cPRNQUH'); // Replace with your actual Stripe secret key

// async function createPaymentIntent(amount, currency) {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount*100,
//       currency: currency,
//     });

//     return paymentIntent.client_secret;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Error creating PaymentIntent');
//   }
// }

// module.exports = {
//   createPaymentIntent,
// };

const stripe = require("stripe")(
  "sk_test_51MWclzAtjY5SrUmvw5yjKXWGqtX8X49DfAFmURNdF57xg8Kr4TYbEgC7DiCYyrlfvd6nfQ55mgtj5ksjRcMRGEpd003cPRNQUH"
);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

    // Ensure that amount is a valid number
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      throw new Error("Invalid amount");
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: numericAmount * 100, // Convert to cents
      currency: "USD",
    });

    return paymentIntent.client_secret;
  } catch (error) {
    console.error(error.message);
    throw new Error("Error creating PaymentIntent");
  }
}

module.exports = {
  createPaymentIntent,
};
