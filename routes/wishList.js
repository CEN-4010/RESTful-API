const express = require('express');
const wishList = require('../models/wishList');
const router = express.Router();
const WishList = require('../models/wishList');
const Book = require('../models/bookModel');
const Cart = require('../models/cart');

// requests: get, post, patch, delete
// router.TYPEOFREQUEST(PATH, (req, res) => {
//      try {

        // } catch (err) {
        //     console.log(err);
        // }
// });


//creates a wishlist for each user in the store
router.post("/wishList/:userId/:uniqueName/:bookId", async (req, res) => {
    const userId = req.params.userId;
    const bookId = req.params.bookId;
    const uniqueName = req.params.uniqueName;

    try{
        // Check if cart exist based on userId
        const cartExist = await WishList.findOne({'userId': userId});

        Book.findById(bookId, function(err, book){


            if (cartExist) {
                // update existing array
                const updateWishList = await WishList.findOneAndUpdate(
                    {'userId': userId},
                    {
                        $addToSet: {
                            books: book
                        }
                    }
                );
            } else {
                // add new document
                const wishList = new WishList({
                    'uniqueName': uniqueName,
                    'userId': userId,
                    'books': [book]
                });
                const addToWishList = await wishList.save();
                console.log("Added to wish list");
                res.send(addToWishList);
            }

        });

    } catch (err) {
        console.log(err);
    }
    
});

//must be able to remove a book from a user's wishlist and add it into the user's shopping cart
    
router.post('wishList/:userId/:bookId', async (req, res) => {
    const userId = req.params.userId;
    const bookId = req.params.bookId;

    try {
        const userWishList = await WishList.findOne({'userId': userId}).books;

        // Individual Book
        const specificBook = userWishList.filter((book) => {
            if (book.bookId === bookId) {
                return book
            }
        });

        // Delete from wish list
        await WishList.findOneAndUpdate(
            {'userId': userId}, 
            {
                $pull: {
                    books: {_id: ObjectId(bookId)}
                }
            });

        // Add to shopping cart
        await Cart.findOneAndUpdate(
            {'userId': userId}, 
            {
                $addToSet: {
                    books: specificBook
                }
            });
        
        res.send("Book moved to shopping Cart!");
    } catch (err) {
        console.log(err);
        res.send("Error moving to shopping Cart!");
    }
        
});


//must be able to retrieve a list books in users wishlist
//router.route('book/viewBooks/WishList').get(bookController.WishList);
router.get('/viewWishList/:userId', async (req, res) => {
    const userId = req.params.userId;

    if (userId) {
        try {
            const userWishList = await WishList.findOne({'userId':userId});
            if (userWishList) {
                console.log(userWishList.books);
                res.send(userWishList.books);
            } else {
                console.log("No wish list found!");
                res.send("Error finding wish list");
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        res.send("User Id not passed").err(500);
    }
        
});
        
    

module.exports = router;
