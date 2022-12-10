var userModel = require('./usersDb')
const express = require('express')
const { check, validationResult } = require('express-validator');
const router = express.Router()
const jwt = require('jsonwebtoken')
const { SignUp } = require('./userMethods')



router.post('/signup', [
    check('FirstName')
    .matches(/^[A-Za-z\s]+$/).withMessage('First Name must be alphabetic.')
    ,
    check('LastName')
    .matches(/^[A-Za-z\s]+$/).withMessage('LastName must be alphabetic.')
    ,
    check('Password').isLength({ min: 5 }).withMessage('Password must be at least 5 chars long')
    .matches(/\d/).withMessage('Password must contain a number')
    ,
    check('Email').custom((value, { req }) => {
        return new Promise((resolve, reject) => {
            userModel.findOne({"Email":
            { $regex: new RegExp("^" + req.body.Email.toLowerCase(), "i") } }
            , function (err, user) {
                if (err) {
                    reject(new Error("Server Error"));
                }
                if (Boolean(user)) {
                    reject(new Error("E-mail already in use"));
                }
                resolve(true);
            });
        });
    }),
]
,
SignUp
)
router.post('/login', async(req,res) => {
    try {
        console.log(req.body)
        const record_to_find = await userModel.findOne({
            Email: req.body.Email, Password: req.body.Password
        })
        if (!record_to_find) {
            res.json({ error: "No User Was Found" });
        }
        const Token = jwt.sign(
            {
                Email: req.body.Email, _id: record_to_find._id
            }
            , process.env.SECRET)
        res.cookie("UserLoggedIN", Token);
        const { _id, Email, FirstName, LastName}  = record_to_find
        return res.json({ Token, msg:'Logged in',user: { _id, Email, FirstName, LastName } })
    } catch (error) {
        console.log(error);
        res.json({ Message: "Error, Kindly Login Again" })
    }
})

router.post('/signout',async (req, res) => {
    console.log('res',res)
    res.clearCookie('UserLoggedIN')
    res.json({
        Message:"Cookie Cleared"
    })
})


module.exports = router