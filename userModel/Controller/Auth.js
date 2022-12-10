var userModel = require('../usersDb')
const express = require('express')
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
var { expressjwt: jwtk } = require("express-jwt");
exports.isSignedIn = jwtk(
    {
        secret: process.env.SECRET,
        userProperty: "auth1",
        algorithms: ['sha1', 'HS256', 'RS256']
})
exports.isAuthenticated = (req, res, next) => {
    console.log("req auth", req.auth)
    console.log('req profile', req.profile)
    try {
        console.log(req.profile._id.toString())
        console.log("req auth is", req.auth)
        console.log("req profile is", req.profile)
        let checker = req.profile && req.auth &&
            req.profile._id.toString() === req.auth._id
        if (!checker) {
            return res.status(403).json({
                error: "Acess is denied"
            })
        }
        next()
    } catch (er) {
        console.log("error", er)
    }
}

exports.getUserByEmail = (req, res, next, id) => {
    console.log("lets get the user by email")
    console.log('ID', id)
    // console.log('reqqUEST',req)
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
