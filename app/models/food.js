var mongoose = require('mongoose');

module.exports = mongoose.model('Food', {
    name: {
        type: String,
        default: ''
    },
    cost: {
      type: Number,
      default: 0
    }
});
