
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    name: {
        type: String,
        required: true
    },
    address: {
        street: String,
        city: String
    },
    cuisine: {
        type: String,
        required: true,
        enum: ['asian', 'euro', 'northwest', 'comfort', 'other']
    },
    reviews: [String]
},
{
    timestamps: true
});

module.exports = mongoose.model('Restaurant', schema);