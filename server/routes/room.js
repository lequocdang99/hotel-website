const express = require('express');
const router = express.Router();

const roomController = require('../controllers/room.js');

//All room list
router.get('/', roomController.getAllRooms);
//Delete room
router.post('/delete', roomController.postDeleteRoom);
//Create new room
router.post('/new', roomController.postNewRoom);
//Get room details
router.get('/detail?title', roomController.getRoomDetail);
//Edit room details
router.post('/edit/:id', roomController.postEditRoom);

module.exports = router;
