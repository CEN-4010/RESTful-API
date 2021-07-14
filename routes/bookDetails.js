const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// routes
router.post('/addBook', (req, res) => {
    const isbn = req.body.isbn;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const author = req.body.author;
    const genre = new.body.genre;
    const publisher = new.body.publisher;
    const yearPub = new.body.yearPub;
    const copiesSold = new.body.copiesSold;

    const book = new Book({
        isbn,
        name,
        description,
        price,
        author,
        genre,
        publisher,
        yearPub,
        copiesSold
    });

    if (isbn) {
        book.save((err, book) => { 
            if (err) return console.log(err);
            console.log(book);
            res.send("Book was added.");
        });
    } else {
        res.send("ISBN required.").status(404);
    }
});

router.get('/getBook/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    const book = await Book.findOne({isbn: isbn});
    res.send(book);
});

module.exports = router;w
