// bookController.js
//Controller functions to get the requested data from the models

// Import book model
Book = require('../models/bookModel');

// Index actions
exports.index = function (req, res) {
    Book.get(function (err, books) {
        if (err) {
            res.json({
                status: "Error",
                message: err,
            });
        }
        res.json({
            message: "Books retrieved successfully",
            data: books
        });
    });
};

// Create book
exports.new = function (req, res) {

    var book = new Book();
    book._id = req.body._id;
    book.ISBN = req.body.ISBN;
    book.name = req.body.name ? req.body.name : book.name;
    book.description = req.body.description;
    book.price = req.body.price;
    book.author = req.body.author;
    book.genre = req.body.genre;
    book.publisher = req.body.publisher;
    book.year_published = req.body.year_published;
    book.copies_sold = req.body.copies_sold;
    book.rating = req.body.rating;
    
    // save the book and check for any errors
    book.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New book created!',
            data: book
        });
    });
};

//View book(s) by genre
exports.view = function (req, res) {
    Book.find({genre : req.params.genre}, function (err, book) {
        if (err) {
            res.json({
                status: "Error",
                message: err,
            });
        }
        else{
            res.json({
                message: "Books by genre",
                data: book,
            });
        }

    });
};

//Top 10 books that have sold the most copies
exports.rating = function (req, res) {
    Book.find({}, function(err, books) {

        if (err) {
            res.json({
                status: "Error",
                message: err,
            });
        }
        else{
            res.json({
                message: "Top 10 books that have sold the most copies",
                data: books,
            });
        }
    }).sort({rating: -1 }).limit(10);
};

