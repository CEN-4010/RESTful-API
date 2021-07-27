//user.js
const mongoose = require('mongoose');

//setup schema
const CreditCardSchema = mongoose.Schema({
    nameOnCard: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    expirationDate: {
        type: String,
        required: true
    },
    cv2: {
        type: String,
        required: true
    }
});

//export model
module.exports = mongoose.model('creditCards', CreditCardSchema);



