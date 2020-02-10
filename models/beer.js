const mongoose = require('mongoose'); //re-access mongoose
const Schema = mongoose.Schema; //access mongoose schema so we can use schema builder

const BeerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: [0, 'Rating must be a number greater than or equal to 0'], //can set min and max for numbers
    max: [10, 'Rating cannot be greater than 10'],
    required: true
  }
});

module.exports = mongoose.model('Beer', BeerSchema); //if someone tries to export this, they'll get the model. 