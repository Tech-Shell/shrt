const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true,
    },
    short: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: new Date,
    },
})

const Links = mongoose.model('Links', linkSchema);

module.exports = Links;