const mongoose = require('../../common/services/mongoose.service').mongoose;

const bookSchema = mongoose.Schema({
    isbn: {
        type: String,
        required: true,
    },
    name: String,
    description: String,
    price: Number,
    author: Number, //use author ID
    genre: String,
    publisher: String,
    yearPub: Number,
    copiesSold: Number
});

module.exports = mongoose.model('Book', bookSchema);