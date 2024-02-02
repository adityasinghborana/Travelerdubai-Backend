const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');
const homepageController = require('../controller/homepageController');
const cityController = require('../controller/citycontroller');
const tourController = require('../controller/tourscontroller');
const aboutController = require('../controller/aboutuscontroller');
const eventController = require('../controller/eventconroller');
const priceController = require('../controller/price_controller');

// User Routes
router.get('/users', userController.getAllUsers);
router.post('/createusers', userController.createUser);
router.delete('/deleteuser', userController.deleteUser);
router.get('/checkuser', userController.checkUser); // checck user is admin or not 
router.put('/updateuser', userController.updateUser); // if you want change it to patch 

// Homepage Routes
 router.get('/homepage', homepageController.getAllData);
 router.get('/bgimage', homepageController.getbgimage);
 router.post('/uploadimage', homepageController.addbgimage);
 router.delete('/deleteimage', homepageController.deletebgimage);
 router.patch('/updatedata', homepageController.updateAllData);
 router.post('/addhomedata', homepageController.addAllData);


 //router.post('/homepagedetails', homepageController.createHomepage);

// aboutrpage Routes
router.get('/Aboutus', aboutController.getAllData);
router.patch('/updateaboutdata', aboutController.updateAllData);





// City Routes
router.get('/fetch-countries-and-cities', cityController.fetchCountriesAndCities);
router.get('/cities', tourController.getAllData);
router.get('/tours', tourController.getallTours);
router.get('/tourtypes', tourController.getalltourtype);
router.get('/tourdetails', tourController.gettoursData);
router.get('/fetchprice', priceController.fetchprice);
// City Routes

router.get('/events', eventController.getallevents);
router.get('/eventtypes', eventController.getalleventtype);

module.exports = router;