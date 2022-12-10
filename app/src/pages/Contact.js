import React, { useEffect, useState } from "react";
import Menu from "./Menu/Menu";
// import 'whatwg-fetch';
import openSocket from 'socket.io-client';
import io from 'socket.io-client'
import { isAuthenticated } from "../apihelper/loginapi";
var socket

export default function Contact() {
    const { user } = isAuthenticated()
    const [NewMessage, setNewMessage] = useState('')
    const [Messages, setMessages] = useState([])
    const [socketConnected, setsocketConnected] = useState(false)
    useEffect(() => {
        socket = io('http://localhost:5000')
        socket.emit('setup', user)
        socket.on('connection', () => setsocketConnected(true))
    }, [])
    var messages = document.getElementById('messages');
    const SendMessage = (event) => {
        event.preventDefault()
        console.log(event.target)
        console.log('', NewMessage)
        // socket = io('http://localhost:5000')
        socket.emit('chat message', NewMessage)
        // socket.on('connection', () => setsocketConnected(true))
    }
    useEffect(() => {
        // socket = io('http://localhost:5000')
        socket.on('message recieved',NewMessage => {
            console.log("message recieved",NewMessage)
            setMessages([...NewMessage])
        })
        // socket.on('connection', () => setsocketConnected(true))
    
    })


    return (
        <div className="bg-gradient-to-tr from-[#22c1c3]
        to-[#fdbb2d] 
        to-red-600 text-gray-100"
            style={{ height: '100vh' }}>
            <div>
                <Menu />
                <div className="">
                    <section className="flex flex-col justify-center mt-[53px] max-w-md mx-auto">
                        <div className="bg-transparent rounded">
                            <div className="flex items-center justify-center mb-4">
                                <h1 className="text-3xl text-white">Your Profile</h1>
                            </div>
                            <form className="flex flex-col justify-center px-4 pb-3">
                                <div className="flex justify-between items-center mb-3">
                                </div>
                                <label className="text-sm font-medium text-white">Message</label>
                                <input className="appearance-none bg-transparent 
                            border-none w-full 
                            text-gray-700 mr-3 leading-tight focus:outline-none
                            mb-3 py-1
                            " type="text" name="NewMessage"
                                    value={NewMessage}
                                    onChange={(e) => { setNewMessage(e.target.value) }}
                                />
                                <button className="px-4 py-1 rounded-md shadow-lg 
                        bg-gradient-to-r from-[#22c1c3]
                        to-[#fdbb2d] text-gray-100"
                                    onClick={SendMessage}
                                    type="submit">
                                    <span >Submit</span>
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
            <ul id="messages">
                Chats
            </ul>
        </div>

    )
}