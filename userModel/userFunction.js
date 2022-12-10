var userModel = require('./usersDb')
const express = require('express')
const { validationResult } = require('express-validator');

exports.getUser = async(req,res) => {
    const User = await userModel.findOne({ Email: req.auth.Email })
    return res.json(User)
}

exports.EditName = async (req, res) => {
    console.log('auth ', req.auth)
    try {
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const SelfName = await userModel.findOne({ Email: req.auth.Email })
        console.log(req.body)
        if (SelfName.FirstName === req.body.FirstName
            ||
            SelfName.LastName === req.body.LastName) {
            console.log('I am here')
            return res.json({ errors: [{ msg: 'Same values' }] })
        }
        
        if(req.body.FirstName.length > 0){
            console.log('first name',req.body.FirstName.length)
            SelfName.FirstName = req.body.FirstName
        }
        if(req.body.LastName.length > 0){
            console.log('last name ',req.body.LastName.length)
            SelfName.LastName = req.body.LastName
        }
        SelfName.save((err, updated) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    error: "Failed to save"
                })
            }
            res.json(updated)
        })
        console.log(SelfName)
        // return res.json(SelfName)
    } catch (err) {
        console.log("err", err)
        return res.json({ errors: [{ msg: 'Server error' }] })
    }
}