const Hotel = require('../models/hotel');
const Room = require('../models/room');
const Transaction = require('../models/transaction');
const mongoose = require('mongoose');

exports.getAllRooms = (req, res, next) => {
  try {
    Room.find().then((room) => {
      if (room) {
        res.status(200).json({ result: room });
      } else {
        res.status(500).json({ message: 'Rooms not found' });
      }
    });
  } catch (err) {
    console.error(err);
  }
};

exports.postDeleteRoom = async (req, res, next) => {
  try {
    const id = req.body.id;
    //Find room by id
    const room = await Room.findById(id);
    //Find room in transactions
    Transaction.find({ room: { $all: room.roomNumbers } }).then((result) => {
      // console.log(result);
      //If room not in transactions
      if (result.length === 0) {
        //Delete room and respond
        Room.findOneAndDelete({ _id: id }).then((result) => {
          if (result) {
            Hotel.findOneAndUpdate(
              { rooms: { $all: [id] } },
              { $pull: { rooms: id } }
            );
            res.status(200).json({ result: result });
            console.log('Room deleted successfully');
          } else {
            res.status(500).json({ message: 'Something went wrong' });
          }
        });
        //If room is in transactions
      } else {
        res.status(500).json({ message: 'Room in transaction' });
      }
    });
  } catch (err) {
    console.error(err);
  }
};

exports.postNewRoom = async (req, res, next) => {
  try {
    //Check if room already exists
    Room.findOne({ title: req.body.title }).then((result) => {
      if (!result) {
        const roomArr = req.body.rooms.split(',').map(Number);
        new Room({
          _id: new mongoose.Types.ObjectId(),
          title: req.body.title,
          price: req.body.price,
          maxPeople: req.body.max_people,
          desc: req.body.desc,
          roomNumbers: roomArr,
        })
          .save()
          .then((room) => {
            Hotel.findOne({ name: req.body.hotel }).then((result) => {
              result.rooms.push(room._id.valueOf());
              result.save();
            });
            res.status(200).json({ result: 'Hotel updated successfully' });
          });
      }
      if (result) {
        res.status(500).json({ message: 'Room already exists' });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getRoomDetail = (req, res, next) => {
  try {
    const id = req.params.id;
    const title = req.query.title;
    if (id) {
      Room.findById(id).then((room) => {
        if (room) {
          res.status(200).json({ result: room });
        } else {
          res.status(500).json({ message: 'No room found' });
        }
      });
    }
    if (title) {
      console.log(title);
    }
  } catch (e) {
    console.error(e);
  }
};

exports.postEditRoom = (req, res, next) => {
  try {
    const id = req.params.id;
    const newRoom = req.body;
    Room.findOneAndUpdate(id, {
      title: newRoom.title,
      desc: newRoom.desc,
      maxPeople: newRoom.maxPeople,
      price: newRoom.price,
      roomNumbers: newRoom.rooms,
    }).then((room) => {
      if (room) {
        res.status(200).json({ result: 'Room updated successfully' });
      } else {
        res.status(500).json({ message: 'Cannot update room' });
      }
    });
  } catch (err) {
    console.error(err);
  }
};
