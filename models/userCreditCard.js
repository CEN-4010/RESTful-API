//user.js
const mongoose = require('mongoose');

//setup schema
const UserCreditCardSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    cards: []
});

//export model
module.exports = mongoose.model('userCreditCard', UserCreditCardSchema);



