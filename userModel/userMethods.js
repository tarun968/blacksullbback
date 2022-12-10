var userModel = require('./usersDb')
const express = require('express')
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

exports.getUserByEmail = (req, res, next, id) => {
    console.log("lets get the user by email")
    console.log('ID', id)
    userModel.findById(id).exec((err, user) => {
        if (err || !user) {
            console.log("error is here 1", err)
            return res.status(400).json({
                error: "No user found in Db"
            })
        }
        console.log('user', user)
        console.log("hui hii")
        req.profile = user;
        next()
    })
}


exports.SignUp = async (req, res) => {
    try {
        const errors = validationResult(req);
        console.log(req.body)
        console.log(errors)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const record_new = await new userModel({
            Email: req.body.Email,
            Password: req.body.Password,
            LastName: req.body.LastName,
            FirstName: req.body.FirstName,
        })
        await record_new.save();
        const token = await createToken(req.body.Email);
        console.log(token);
        res.cookie("user", token, {
            httpOnly: true
        })
        return res.json({ record_new });
    }
    catch (err) {
        console.log('error', err.error)
        return res.json({ error: err })
    }
}



const createToken = async (id) => {
    const x = jwt.sign({ id: id }, process.env.SECRET)
    return x;
}