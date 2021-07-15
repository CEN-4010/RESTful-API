// bookBrowsing.js 

// Initialize express router
let router = require('express').Router();

// Import book controller
var bookController = require('../controller/bookController');

// Book routes
router.route('/book').get(bookController.index).post(bookController.new);
router.route('/book/:genre').get(bookController.view);
    
// Export routes
module.exports = router;



