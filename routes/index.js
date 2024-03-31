const express = require("express");
const router = express.Router();
const userController = require("../controller/usercontroller");
const homepageController = require("../controller/homepageController");
const cityController = require("../controller/citycontroller");
const tourController = require("../controller/tourscontroller");
const aboutController = require("../controller/aboutuscontroller");
const eventController = require("../controller/eventconroller");
const priceController = require("../controller/price_controller");
const Optioncontroller = require("../controller/touroptiondynamic");
const staticOptioncontroller = require("../controller/touroptionstatic");
const cartcontroller = require("../controller/cartcontroller");
const TimeSlotcontroller = require("../controller/timeslotcontroller");
const Bookingcontroller = require("../controller/bookingcontroller");
const paymentController = require("../controller/stripecontroller");
const imageController = require("../controller/imagecontroller");
const uploadMiddleware = require("../middlewares/multerMiddleware");
const getSliderImages = require("../controller/backgroundimage");
const apiKeyConroller = require("../controller/apicontroller");
// User Routes
router.get("/users", userController.getAllUsers); //for admin
router.post("/createusers", userController.createUser); //for admin and user
router.delete("/deleteuser", userController.deleteUser); //for admin
router.get("/checkuser", userController.checkUser); //for user
router.put("/updateuser", userController.updateUser); // if you want change it to patch for admin and userpanel

// Homepage Routes
router.get("/homepage", homepageController.getAllData); //for admin and user
router.get("/bgimage", homepageController.getbgimage); //for admin and user
router.post("/uploadimage", homepageController.addbgimage); //for admin
router.delete("/deleteimage", homepageController.deletebgimage); //for admin
router.patch("/updatedata", homepageController.updateAllData); //for admin
router.post("/addhomedata", homepageController.addAllData); //for admin

//router.post('/homepagedetails', homepageController.createHomepage);

// aboutrpage Routes
router.get("/Aboutus", aboutController.getAllData); //for admin and user
router.patch("/updateaboutdata", aboutController.updateAllData); //for admin

// City Routes
router.get(
  "/fetch-countries-and-cities",
  cityController.fetchCountriesAndCities
); //for admin
router.get("/cities", tourController.getAllData); //for admin and user
router.get("/tours", tourController.getallTours); //for admin and user
router.get("/tourtypes", tourController.getalltourtype); //for admin and user
router.get("/tourdetails", tourController.gettoursData); //for admin and user
router.get("/fetchprice", priceController.fetchprice); //for admin and user
// City Routes

router.get("/events", eventController.getallevents);
router.get("/eventtypes", eventController.getalleventtype);

//touroption
router.post("/touroptions", Optioncontroller.fetchoptions);
router.post("/touroptionsstatic", staticOptioncontroller.fetchoptions);
router.post("/timeslots", TimeSlotcontroller.fetchtimeslots);

// cart
router.post("/createcart", cartcontroller.createCart); //for  user
router.put("/updatecart", cartcontroller.updateCartTourDetail); //for  user
router.post("/cart", cartcontroller.getCart); //for user

// bookings

router.post("/bookings", Bookingcontroller.book);
router.post(
  "/create-payment-intent",
  paymentController.handleCreatePaymentIntent
);

// image uploads
router.post("/upload", uploadMiddleware, imageController.uploadImage);
router.get("/sliderimages", getSliderImages.getSliderImages);

//apikey
router.get("/apikey", apiKeyConroller.getRayanaApi);
router.put("/updateapikey", apiKeyConroller.UpdateRayanaApi);

module.exports = router;
