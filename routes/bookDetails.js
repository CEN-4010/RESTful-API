//bookDetails.js

// imports
const express = require('express');
const router = express.Router();
const Book = require('../models/bookModel');
const Author = require('../models/author');
const bookController = require('../controller/bookController');

// routes
// add book

router.route('./addBook').post(bookController.new);

// add author
router.post('/addAuthor', (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const biography = req.body.biography;
    const publisher = req.body.publisher;

    const author = new Author({
        first_name,
        last_name,
        biography,
        publisher
    });

    if (author) {
        author.save((err, author) => { 
            if (err) return console.log(err);
            console.log(author);
            res.send("Author was added.");
        });
    } else {
        res.send("Error in adding author.").status(404);
    }
});

// retrieve a book’s details by ISBN
router.get('/book/byISBN/:ISBN', async (req, res) => {
    const ISBN = req.params.ISBN;
    const book = await Book.findOne({ISBN: ISBN});
    res.send(book);
});

// retrieve a list of books associated with an author
router.get('/book/byAuthor/:author', async (req, res) => {
    const authorName = req.params.author;
    const booksByAuthor = await Book.find({author: authorName});
    res.send(booksByAuthor);
});

// export model
module.exports = router;