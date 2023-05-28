const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  maxPeople: { type: Number, required: true },
  desc: { type: String, required: true },
  roomNumbers: [{ type: Object, required: true }],
});

module.exports = mongoose.model('Room', roomSchema);
