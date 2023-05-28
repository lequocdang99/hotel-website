const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  cheapestPrice: { type: Number, required: true },
  distance: { type: Number, required: true },
  photos: { type: Object, required: true },
  desc: { type: String, required: true },
  rating: { type: Number },
  featured: { type: String, required: true },
  rooms: [{ type: Schema.Types.ObjectId, required: true, ref: 'Room' }],
  title: { type: String, required: true },
});

module.exports = mongoose.model('Hotel', hotelSchema);
