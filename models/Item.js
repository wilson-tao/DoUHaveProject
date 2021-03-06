const mongoose = require('mongoose');



const itemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, default: '', required: true },
  itemImg: { type: String, default: '', required: true },
  pic: { type: String, default: '', required: false },
  budget: { type: Number, required: true },
  category: { type: String, default: '', required: true },
  condition: { type: String, default: '', required: true },
  description: { type: String, default: '', required: true },
  location: { type: String, default: '', required: true },
  locationState: { type: String, default: '', required: true },
  locationZip: { type: String, default: '', required: true },
  submittedby: { type: String, default: '', required: true },
  createdAt: { type: Date, default: Date.now, required: true},
  expirationDate: { type: Date, default: () => Date.now() + 7*24*60*60*1000, required: true},
  submittedby1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  carmake: { type: String, default: null, required: false },
  carmodel: { type: String, default: null, required: false },
  caryear: { type: String, default: null, required: false },
  cellmake: { type: String, default: undefined, required: false },
  cellmodel: { type: String, default: undefined, required: false },
  cellcarrier: { type: String, required: false },
  cellos: { type: String, required: false },
  gamesystem: { type: String, required: false },
  contactinfo: { type: String, required: true }
});

itemSchema.index({
  name: 'text',
  description: 'text',
  locationZip: 'text',
  carmake: 'text',
  carmodel: 'text',
  caryear: 'text',
  cellmake: 'text',
  cellmodel: 'text',
  cellcarrier: 'text',
  cellos: 'text',
  gamesystem: 'text'
});

module.exports = mongoose.model('Item', itemSchema);
