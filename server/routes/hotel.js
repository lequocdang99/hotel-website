const express = require('express');
const router = express.Router();

const hotelController = require('../controllers/hotel');

//Get all hotels
router.get('/', hotelController.getHotels);
//Search hotel
router.get('/search', hotelController.getSearchedHotel);
//Get hotel detail
router.get('/detail/:id', hotelController.getHotelDetail);
//Delete hotel
router.post('/delete', hotelController.postDeleteHotel);
//Create new hotel
router.post('/new', hotelController.postNewHotel);
//Edit hotel
router.post('/edit/:id', hotelController.postEditHotel);

module.exports = router;
