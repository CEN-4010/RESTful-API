const express = require('express');
const cart = require('../models/cart');
const user = require('../models/user');
const book = require('../models/book');
const router = express.Router();

//update shooping cart with book
router.post("/cart/:userId/:bookId", (req, res) => {
    const userId = req.params.userId;
    const bookId = req.params.bookId;

        book.findById(bookId, function(err, book){

            const cart = new Cart({
                userId,
                book
            });


        if(cart){
            cart.save((err, res) => {
            if(err) return console.log(err)
            res.send('Book was add to Shopping cart')
        })

    }else{
        res.send('User ID required')
    }
    
    })

});

//get list of books in shopping cart
router.get('/cart/:userId/get-books', (req, res) => {
    const userId = req.params.userId;

    cart.find(userId, function(err, books){
        res.send(books);
    })

})

//delete book from shopping cart
router.delete('/cart/:userId/:bookId', (req, res) => {
    const userId = req.params.userId;
    const bookId = req.params.bookId;
    
    user.findById(userId, function(err, user){
        if(err){
            return console.log(err)
        }else if(userId == user.id){
            
            book.findById(bookId, function(err, book) {
                if(err){
                    return console.log(err)
                }else if(bookId == book.id){
                     book.delete
                }
            })

        }
    })

})

module.exports = router;