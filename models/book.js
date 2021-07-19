const mongoose = require("moongoose")

const Bookschema = mongoose.Schema({
    id: {
        type: number
    },
    ISBN: {
        type: number
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    price:{
        type: number
    },
    author: {
        type: String
    },
    genre: {
        type: String
    },
    publisher: {
        type: String
    },
    year_published: {
        type: String
    },
    copies_sold: {
        type: number
    },
    rating: {
        type: number
    } 
    
});

module.exports = mongoose.model('Book', Bookschema);