const mongoose = require("moongoose")
const book = require("../models/book")

const Shoppingschema = mongoose.Schema({
    
        books: [book]
            
});

module.exports = mongoose.model('Cart', Shoppingschema);