const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  area: String,
  pincode: String,
  subject: String,
  description: String,
  status:String,
}, {
  timestamps: true
});

const Query = mongoose.model('Query', querySchema);

module.exports = Query;
