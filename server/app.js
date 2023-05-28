const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const userRoutes = require('./routes/user');
const hotelRoutes = require('./routes/hotel');
const transactionRoutes = require('./routes/transaction');
const roomRoutes = require('./routes/room');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Connect to hotels database
mongoose
  .connect('mongodb://localhost/hotelsdb')
  .then(() => {
    console.log('Connected to hotel database');
  })
  .catch(() => console.error('Failed to connect to hotel database'));

//Routes handlers
app.use('/user', userRoutes);
app.use('/hotel', hotelRoutes);
app.use('/transaction', transactionRoutes);
app.use('/room', roomRoutes);

//Port
app.listen(5000, () => console.log('Server listening on port 5000'));
