const express = require("express");
const router = express.Router();
const path = require("path");
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
const apiKeyConroller = require("../controller/apicontroller");
const Bgimagecontroller = require("../controller/backgroundimage");
const emailConroller = require("../controller/email_controller");
const rolecontroller = require("../controller/rolecontroller");
const tourtypescontroller = require("../controller/tourtypecontroller");
const createcitycontroller = require("../controller/addcitycontroller");
const AddTourController = require("../controller/addtourcontroller");
const Staticpage = require("../controller/staticpagescontroller");
const addEventController = require("../controller/addeventcontroller");
const couponsController = require("../controller/couponcontroller");

// User Routes
router.get("/users", userController.getAllUsers); //for admin
router.post("/createusers", userController.createUser); //for admin and user
router.delete("/deleteuser", userController.deleteUser); //for admin
router.get("/checkuser", userController.checkUser); //for user
router.put("/updateuser", userController.updateUser); // if you want change it to patch for admin and userpanel

// Homepage Routes
router.get("/homepage", homepageController.getAllData); //for admin and user
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
router.post("/event", eventController.getevent);

//touroption
router.post("/touroptions", Optioncontroller.fetchoptions);
router.post("/touroptionsstatic", staticOptioncontroller.fetchoptions);
router.post("/timeslots", TimeSlotcontroller.fetchtimeslots);

// cart
router.post("/createcart", cartcontroller.createCart); //for  user
router.put("/updatecart", cartcontroller.updateCartTourDetail); //for  user
router.post("/cart", cartcontroller.getCart); //for user
router.delete("/deletecartitem", cartcontroller.deleteCartTourDetail); //for user

// bookings
router.get("/allbookings", Bookingcontroller.getAllBookings);
router.post("/bookings", Bookingcontroller.book);
router.post(
  "/create-payment-intent",
  paymentController.handleCreatePaymentIntent
); // for user and admin

//apikey
router.get("/apikey", apiKeyConroller.getRayanaApi);
router.put("/updateapikey", apiKeyConroller.UpdateRayanaApi);
router.get("/stripekey", apiKeyConroller.getStripeSecretApi);
router.put("/updatestripekey", apiKeyConroller.UpdateStripeSecretApi);

//email routes

router.get("/email", emailConroller.getEmail);
router.patch("/update-email", emailConroller.updateEmail);
// get bookings
router.post("/userbookings", Bookingcontroller.getUserBookings);
router.post("/bookingdetail", Bookingcontroller.getBookingDetails);
//vendors
router.get("/allvendors", rolecontroller.fetchAllVendor);
router.post("/vendor", rolecontroller.fetchVendor);
router.post("/signupvendor", rolecontroller.signupVendor);

// create tourtypes
router.post("/addtourtypes", tourtypescontroller.tourtype);
router.post("/addtour", AddTourController.addTour);
router.post("/addevent", addEventController.addEvent);

//add city
router.put("/addcity", createcitycontroller.addCity);

//staticcontent
router.post("/submitform", Staticpage.PostFormSubmission);
router.get("/forms", Staticpage.getFormSubmisisionData);
router.get("/contactusdata", Staticpage.getContactUsData);
router.patch("/updatecontactusdata", Staticpage.updateContactUsData);
router.get("/experiencesdata", Staticpage.getExperiencesData);
router.patch("/updateexperiencesdata", Staticpage.updateExperiencesData);
router.get("/footerdata", Staticpage.getFooterData);
router.patch("/updatefooterdata", Staticpage.updateFooterData);

//images

router.delete("/deletelibraryimage", imageController.deleteImage);
router.post("/upload", uploadMiddleware, imageController.uploadImage);
router.get("/library", imageController.getAllImages);
router.get("/sliderimages", homepageController.getbgimage); //for admin and user
router.post(
  "/setsliderimage",

  Bgimagecontroller.selectSliderimage
); //for admin
router.delete("/deleteimage", homepageController.deletebgimage);
router.get("/coupons", couponsController.getCoupons);
router.post("/createcoupons", couponsController.createCoupons);
router.delete("/deletecoupon", couponsController.deleteCoupons);
router.post("/checkcoupon", couponsController.checkCoupons);

module.exports = router;
