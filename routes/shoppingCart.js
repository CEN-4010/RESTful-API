const express = require('express');
const Cart = require('../models/cart.js');
const User = require('../models/user');
const Book = require('../models/bookModel');
const router = express.Router();
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

//update shooping cart with book
router.post("/cart/:userId/:bookId", async (req, res) => {
    const userId = req.params.userId;
    const bookId = (req.params.bookId).trim();
    
    try {
        var bookToAdd = await Book.findById(bookId);
        const cartExist = await Cart.findOne({'userId': userId});
        
        if(cartExist){
            const existingCart = await Cart.findOneAndUpdate({
                   'userId': userId
                }, {
                    $addToSet: {
                        books: bookToAdd 
                    }
                }) 
            res.send('Book was add to existing Shopping cart').status(500);
            console.log(existingCart);
        }else{
            const cart = new Cart({
                    userId: userId,
                    books:[bookToAdd]
                });

            // Cart.findOneAndUpdate({
            //         'userId': userId
            //     }, {
            //         $addToSet: {
            //             books: bookToAdd 
            //         }
            //     }) 

           const responded =  await Cart.save(cart);
            console.log(responded);
            res.send('Book was add to new Shopping cart').status(500);
        }
            
    } catch (err) {
        console.log(err);
        res.send("Error");
    }

});

// get list of books in shopping cart
router.get('/cart/:userId/get-books', async (req, res) => {
    const userId = req.params.userId;

    const bookList = await Cart.findOne({'userId': userId});
    res.send(bookList.books)

})

// test request
// router.get('/cart/:bookId', async (req, res) => {
//     const bookId = (req.params.bookId).trim();

//     try {
//         var book = await Book.findById(bookId);
//         console.log(book);
//         res.send("Got book back1");
//     } catch(err) {
//         console.log(err);
//     }
// });

//delete book from shopping cart
router.delete('/cart/:userId/:bookId', async (req, res) => {
    const userId = req.params.userId;
    const bookId = req.params.bookId;
    
    await Cart.findOneAndUpdate(
        {
            'userId': userId,
        },
        {
            $pull: {
                books: {_id: ObjectId(bookId)},
            },
        }
    )
    res.send("Book was deleted");
})

module.exports = router;