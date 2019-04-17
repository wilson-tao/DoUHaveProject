const mongoose = require('mongoose');

const offerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  itemOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  submittedAt: { type: Date, default: () => Date.now(), required: true },
  myOffer: { type: Number, required: true },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contactPhone: { type: String, required: true },
  contactEmail: { type: String, required: true, match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
  offerMessage: { type: String, required: false },
  accepted: { type: Boolean, default: null },
  messageBack: { type: String, default: '' }
});


module.exports = mongoose.model('Offer', offerSchema);
