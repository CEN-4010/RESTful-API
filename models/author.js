// author.js
const mongoose = require('mongoose');

// schema
const authorSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    biography: {
        type: String
    },
    publisher: {
        type: String
    }
});

// export model
module.exports = mongoose.model('Author', authorSchema);