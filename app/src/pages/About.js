import React from "react";
import Menu from "./Menu/Menu";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../apihelper/funcapi";
import { isAuthenticated } from "../apihelper/loginapi";
import { GetUSer } from "../redux/authSlice";
export default function About() {
    const [User, SetUser] = useState({
        FirstName: "",
        LastName: "",
        Email: ""
    })
    const [Email, SetUserEmail] = useState("")
    const [LastName, SetUserLName] = useState("")
    const [FirstName, SetUserName] = useState("")
    const dispatch = useDispatch()
    const { user, Token } = isAuthenticated()
    const preload = () => {
        if (user !== undefined) 
        {

            dispatch(GetUSer({user,Token})).then(s => {
                console.log("ssss",s.payload)
                SetUserEmail(s.payload.Email)
                SetUserLName(s.payload.LastName)
                SetUserName(s.payload.FirstName)
            })
        }

    }
    console.log("",Email)
    useEffect(() => {
        preload()
    }, [])

    return (
        <div className="bg-gradient-to-tr from-[#22c1c3]
        to-[#fdbb2d] 
        to-red-600 text-gray-100" 
        style={{height:'100vh'}}>
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
                                <label className="text-sm font-medium text-white">Email Id</label>
                                <input className="appearance-none bg-transparent 
                            border-none w-full 
                            text-gray-700 mr-3 leading-tight focus:outline-none
                            mb-3 py-1
                            " type="email" name="Email"
                                    readOnly
                                    value={isAuthenticated() ? Email : 'NOT LOGGED IN'}
                                />
                                <label className="text-sm font-medium text-white">First Name</label>
                                <input className="appearance-none bg-transparent 
                            border-none w-full 
                            text-gray-700 mr-3 leading-tight focus:outline-none
                            mb-3 py-1
                            " type="text" name="FirstName"
                                    readOnly
                                    value={isAuthenticated() ? FirstName : 'NOT LOGGED IN'}
                                />
                                
                                <label className="text-sm font-medium text-white">Last Name</label>
                                <input className="appearance-none bg-transparent 
                            border-none w-full 
                            text-gray-700 mr-3 leading-tight focus:outline-none
                            mb-3 py-1
                            " type="text" name="LastName"
                                    readOnly
                                    value={isAuthenticated() ? LastName : 'NOT LOGGED IN'}
                                />
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}