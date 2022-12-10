const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser());
const formidable = require('formidable')
const _ = require('lodash')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());
const corsOptions = {
    origin: '*',
}
app.use(cors(corsOptions))
const fs = require('fs')
const { resolveSrv } = require('dns')
mongoose.connect('mongodb://localhost:27017/blaccskull',
    { useNewUrlParser: true, useUnifiedTopology: true })
app.use(bodyParser.json());
const { sortBy, intersection } = require('lodash')
const { Console } = require('console')
const { getMaxListeners } = require('process')
const userLogin = require('./userModel/userLogin')
const { isSignedIn, isAuthenticated } = require('./userModel/Controller/Auth')
const { getUserByEmail } = require('./userModel/userMethods')
const { EditName, getUser } = require('./userModel/userFunction');
const { createSocket } = require('dgram');
// const http = require('http').Server(app);






app.use('/user', userLogin)

app.param('userbymail', getUserByEmail)

app.post('/:userbymail/editname'
    , isSignedIn
    , isAuthenticated
    ,
    [check('FirstName')
        .matches(/^[A-Za-z\s]+$/).withMessage('First Name must be alphabetic.')
        ,
    check('LastName')
        .optional({ checkFalsy: true }).matches(/^[A-Za-z\s]+$/).withMessage('LastName must be alphabetic.')]
    , EditName)
app.get("/:userbymail/user", isSignedIn, isAuthenticated, getUser)


const server = app.listen(5000,
    console.log("5000 port active")
)

// io.listen(5000, function () {
//         console.log("5000 port active")
//     });

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
        // credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        console.log("user data", userData)
        socket.join(userData);
        socket.emit("connected");
    });

    // socket.on("join chat", (room) => {
    //   socket.join(room);
    //   console.log("User Joined Room: " + room);
    // });
    // socket.on("typing", (room) => socket.in(room).emit("typing"));
    // socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
    socket.on('chat message', (msg) => {
        // io.emit("chat message", msg)
        console.log('msg', msg)
        socket.emit('message recieved',msg)
        console.log("message send")
    })
    // socket.on("chat message", (message) => {
    //     console.log("new message is here ", message)
        //   var chat = newMessageRecieved.chat;

        //   if (!chat.users) return console.log("chat.users not defined");

        //   chat.users.forEach((user) => {
        //     if (user._id == newMessageRecieved.sender._id) return;

        //     socket.in(user._id).emit("message recieved", newMessageRecieved);
        //   });
    // });

    // socket.off("setup", () => {
    //   console.log("USER DISCONNECTED");
    //   socket.leave(userData._id);
    // });
});