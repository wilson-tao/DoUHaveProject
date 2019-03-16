const mongoose = require('mongoose');

const savelistSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  quantity: { type: Number, default: 1, required: true }
});

module.exports = mongoose.model('Savelist', savelistSchema);
