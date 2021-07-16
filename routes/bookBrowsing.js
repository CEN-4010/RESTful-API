// bookBrowsing.js 

// Initialize express router
let router = require('express').Router();

// Import book controller
var bookController = require('../controller/bookController');

// Book routes
router.route('/book').get(bookController.index).post(bookController.new);
router.route('/book/genre/:genre').get(bookController.view);
router.route('/book/rating/topTenSold').get(bookController.rating);
    
// Export routes
module.exports = router;





