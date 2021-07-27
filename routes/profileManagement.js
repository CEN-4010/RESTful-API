const express = require('express');
const router = express.Router();
const User = require('../models/user');
const CreditCard = require('../models/creditCard');
const UserCreditCard = require('../models/userCreditCard');

// routes
router.post('/createUser', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.password;
    const emailAddress = req.body.emailAddress;
    const homeAddress = req.body.homeAddress;

    const user = new User({
        username,
        password,
        name,
        emailAddress,
        homeAddress
    });

    if (username && password) {
        user.save((err, user) => { 
            if (err) return console.log(err);
            console.log(user);
            res.send("User was created!");
        });
    } else {
        res.send("Username and password are required!").status(404);
    }
});


router.get('/getUser/:username', async (req, res) => {
    const username = req.params.username;
    if (username) {
        try {
            const user = await User.findOne({username: username});
            res.send(user);
        } catch (err) {
            res.send("Cound't get user!").err(500);
        }
    }
});

router.patch('/updateUser/:userId', async (req, res) => {
    const userId = (req.params.userId).trim();
    const newUsername = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const homeAddress = req.body.homeAddress;

        try {
            const updateUser = await User.updateOne(
                {'_id': userId},
                {
                    $set: {
                        'username': newUsername,
                        'password': password,
                        'name': name,
                        'homeAddress': homeAddress
                    }
                }
            );
            res.json(updateUser);
        } catch (err) {
            console.log(err);
            res.send("Error updating user!").err(500);
        }

});


router.post('/addCreditCard/:userId', async (req, res) => {
    const userId = (req.params.userId).trim();
    const nameOnCard = req.body.nameOnCard;
    const cardNumber = req.body.cardNumber;
    const expirationDate = req.body.expirationDate;
    const cv2 = req.body.cv2;

    const creditCard = {
        'nameOnCard': nameOnCard,
        'cardNumber': cardNumber,
        'expirationDate': expirationDate,
        'cv2': cv2
    };

    try {
        const userExist = await UserCreditCard.findOne({'userId': userId});
        if (userExist) {
            const updateCreditCards = await UserCreditCard.findOneAndUpdate(
                {'userId': userId},
                {
                    $addToSet: {
                        cards: creditCard
                    }
                });
            res.send(updateCreditCards);
        } else {
            const userCreditCards = new UserCreditCard({'userId': userId, cards: [creditCard]});
            const addCreditCard = await userCreditCards.save(userCreditCards);
            res.send(addCreditCard);
        }
    } catch (err) {
        console.log(err);
        res.send("Error adding card!").err(500);
    }
    

});


router.get('/geUserCreditCards/:userId', async (req,res) => {
    const userId = req.params.userId;

    if(userId) {
        try {
            const userCreditCards = await UserCreditCard.findOne({userId: userId});
            res.send(userCreditCards.cards);
        } catch (err) {
            res.send("Error getting cards!");
            res.err(500);
        }
    } else {
        res.send("Error getting card!").err(400);
    }
    
});


module.exports = router;


