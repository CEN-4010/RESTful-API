const mongoose = require("moongoose")
const book = require("../models/book")

const wishListSchema = mongoose.Schema({
        name: {type: String},
        userId: {type: String},
        books: [book]
});

module.exports = mongoose.model('Wish List', wishListSchema);