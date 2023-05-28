const User = require('../models/user');

exports.getUser = (req, res, next) => {
  try {
    const email = req.params.email;
    const password = req.params.password;
    const isAdmin = req.query.isAdmin;
    if (!isAdmin) {
      User.findOne({ email: email, password: password }).then((user) => {
        if (!user) {
          res.json({ message: 'No user found' });
        } else {
          res.json({ result: true });
        }
      });
    }
    if (isAdmin) {
      User.findOne({ email: email, password: password, isAdmin }).then(
        (user) => {
          if (!user) {
            res.json({ message: 'No admin user found' });
          } else {
            res.json({ result: true });
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

exports.createUser = (req, res, next) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    User.findOne({ email: userEmail }).then((user) => {
      if (!user) {
        const user = new User({
          username: userEmail,
          password: userPassword,
          phoneNumber: 0,
          email: userEmail,
          isAdmin: userEmail === 'tom@test.com' ? true : false,
        });
        user.save();
        res.status(200).json({ message: 'New user created' });
      } else {
        res.status(500).json({ message: 'User already exists' });
      }
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getAllUsers = (req, res, next) => {
  try {
    User.find().then((result) => {
      if (!result) {
        res.status(500).json({ message: 'Users not found' });
      } else {
        res.status(200).json({ result: result });
      }
    });
  } catch (err) {
    console.error(err);
  }
};
