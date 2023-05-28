const Hotel = require('../models/hotel');
const Room = require('../models/room');
const Transaction = require('../models/transaction');

exports.getHotels = (req, res, next) => {
  try {
    Hotel.find().then((hotels) => {
      if (!hotels) {
        res.status(500).json({ message: 'No hotels found' });
      } else {
        res.status(200).json({ result: hotels });
      }
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getSearchedHotel = (req, res, next) => {
  try {
    const destination = req.query.destination;
    const date = new Date(req.query.date).toDateString();
    const min = req.query.min;
    const max = req.query.max;
    const adult = req.query.adult;
    const children = req.query.children;
    const room = req.query.room;
    const searchHotel = async () => {
      let resultHotel = await Hotel.find().populate('rooms');
      let resultTrans = await Transaction.find();
      //Find hotel destination
      if (destination) {
        resultHotel = resultHotel.filter((hotel) =>
          hotel.city.includes(destination)
        );
      }
      //Find room availability
      if (req.query.date) {
        if (resultTrans.length > 0) {
          bookedHotel = resultTrans
            .filter(
              (trans) =>
                trans.dateStart.toDateString() === date ||
                trans.dateEnd.toDateString() === date
            )
            .map((e) => e.hotel.valueOf());
          resultHotel = resultHotel.filter((hotel) => {
            return !bookedHotel.includes(hotel._id.valueOf());
          });
        }
      }
      // Find hotel in price range
      if (min) {
        resultHotel = resultHotel.filter((hotel) => hotel.cheapestPrice >= min);
      }
      if (max) {
        resultHotel = resultHotel.filter((hotel) => hotel.cheapestPrice <= max);
      }
      if (min && max) {
        resultHotel = resultHotel.filter(
          (hotel) => hotel.cheapestPrice >= min && hotel.cheapestPrice <= max
        );
      }
      //Find rooms have max people
      if (adult) {
        resultHotel = resultHotel.filter((hotel) => {
          return hotel.rooms.some((room) => room.maxPeople >= parseInt(adult));
        });
      }
      if (children) {
        resultHotel = resultHotel.filter((hotel) => {
          return hotel.rooms.some(
            (room) => room.maxPeople >= parseInt(adult) + parseInt(children / 2)
          );
        });
      }
      //Find hotel have enough room
      if (room) {
        resultHotel = resultHotel.filter((hotel) => hotel.rooms.length >= room);
      }
      res.status(200).json({ result: resultHotel });
    };
    searchHotel();
  } catch (err) {
    console.error(err);
  }
};

exports.getHotelDetail = (req, res, next) => {
  try {
    const id = req.params.id;
    const room = req.query.room;
    if (!room) {
      Hotel.findById(id)
        .populate('rooms')
        .then((result) => {
          if (result) {
            res.status(200).json({ result: result });
          } else {
            res.status(500).json({ message: 'No hotel found' });
          }
        });
    }
    if (room) {
      Hotel.findById(id).then((result) => {
        if (result) {
          res.status(200).json({ result: result });
        } else {
          res.status(500).json({ message: 'No hotel found' });
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
};

exports.postDeleteHotel = (req, res, next) => {
  try {
    const id = req.body.id;
    Hotel.findOneAndDelete({ _id: id }).then((result) => {
      if (result) {
        res.status(200).json({ result: result });
        console.log('Hotel deleted successfully');
      } else {
        res.status(500).json({ message: 'Something went wrong' });
      }
    });
  } catch (err) {
    console.error(err);
  }
};

exports.postNewHotel = async (req, res, next) => {
  try {
    //Find if hotel is already existing
    const existed = await Hotel.findOne({ name: req.body.name });
    console.log(existed);
    if (!existed) {
      const room = await Room.findOne({ title: req.body.room });
      const hotel = new Hotel({
        name: req.body.name,
        type: req.body.type,
        city: req.body.city,
        address: req.body.address,
        cheapestPrice: req.body.price,
        distance: req.body.distance,
        photos: [req.body.images],
        desc: req.body.desc,
        rating: 0,
        featured: req.body.featured,
        rooms: [room._id.valueOf()],
        title: req.body.name,
      });
      hotel
        .save()
        .then(() =>
          res.status(200).json({ result: 'Hotel created successfully' })
        );
    }
    if (existed) {
      res.status(500).json({ message: 'Hotel already exists' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.postEditHotel = (req, res) => {
  try {
    const id = req.params.id;
    const newHotel = req.body;
    Hotel.findByIdAndUpdate(id, {
      name: newHotel.name,
      city: newHotel.city,
      type: newHotel.type,
      address: newHotel.address,
      distance: newHotel.distance,
      desc: newHotel.desc,
      featured: newHotel.featured,
      images: newHotel.images,
      rooms: newHotel.rooms,
    }).then((result) => {
      if (result) {
        res.status(200).json({ result: 'Hotel updated successfully' });
      } else {
        res.status(500).json({ message: 'Hotel cannot be updated ' });
      }
    });
  } catch (err) {
    console.error(err);
  }
};
