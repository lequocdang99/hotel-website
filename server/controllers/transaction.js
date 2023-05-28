const Transaction = require('../models/transaction');
const User = require('../models/user');

exports.getTransactionRoom = (req, res, next) => {
  try {
    const id = req.params.id;
    const checkin = new Date(req.query.checkin).toISOString();
    const checkout = new Date(req.query.checkout).toISOString();
    //There is transaction
    if (Transaction.find()) {
      //Find transaction in range
      Transaction.find({
        hotel: id,
        dateStart: { $gte: checkin },
        dateEnd: { $lte: checkout },
      }).then((trans) => {
        if (trans) {
          res.status(200).json({
            result: trans.map((e) => e.room),
          });
        }
      });
    } else {
      res.status(500).json({ message: 'No transaction found' });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.postTransaction = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      card,
      payment,
      price,
      hotel,
      dateStart,
      dateEnd,
      room,
    } = req.body;
    //Find user by email
    const user = await User.findOne({ username: email });
    //Create new transaction
    if (user) {
      //Update user phone number
      User.findOneAndUpdate(
        { username: email },
        { fullName: name },
        { phoneNumber: phone }
      ).then(() => console.log('Update user informations successfully'));
    }
    const transaction = new Transaction({
      user: user,
      hotel: hotel,
      room: room,
      dateStart: dateStart,
      dateEnd: dateEnd,
      price: price,
      payment: payment,
      status: 'Booked',
    })
      .save()
      .then(() => {
        res
          .status(200)
          .json({ result: 'New transaction created successfully' });
      });
  } catch (err) {
    console.error(err);
  }
};

exports.getTransaction = async (req, res, next) => {
  try {
    const username = req.query.username;
    const user = await User.findOne({ username: username });
    if (username) {
      Transaction.find({ user: user._id })
        .populate('hotel')
        .then((result) => {
          if (result) {
            res.status(200).json({ result: result });
          } else {
            console.log(req);
            res.status(500).json({ message: 'No transaction found' });
          }
        });
    } else {
      Transaction.find()
        .populate('user')
        .populate('hotel')
        .then((result) => {
          if (result) {
            res.status(200).json({ result: result });
          } else {
            res.status(500).json({ message: 'No transaction found' });
          }
        });
    }
  } catch (err) {
    console.error(err);
  }
};

exports.editTransaction = (req, res, next) => {
  try {
    const id = req.query.id;
    const newStatus = req.query.newStatus;
    Transaction.findOneAndUpdate({ _id: id }, { status: newStatus }).then(() =>
      res.status(200).json({ result: 'Status updated successfully' })
    );
  } catch (err) {
    console.error(err);
  }
};
