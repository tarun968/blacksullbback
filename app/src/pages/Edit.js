import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu/Menu";
import { useDispatch } from "react-redux";
import { EditUSer } from "../redux/authSlice";
import { isAuthenticated, authenticate } from "../apihelper/loginapi";
import { EditName } from "../apihelper/funcapi";

export default function Edit() {
    const { user, Token } = isAuthenticated()    
    const [LastName, SetUserLName] = useState("")
    const [FirstName, SetUserName] = useState("")
    const dispatch = useDispatch()
    const Signup2 = (event) => {
        event.preventDefault();
        dispatch(EditUSer({LastName, FirstName, user,Token }))
    }
    // const [ValuesLog, setLogValues] = useState({
    //     FirstName:"",
    //     LastName: "",
    //     ErrorL: "",
    //     Success: false
    // })
    // const { FirstName, LastName, ErrorL, Success } = ValuesLog
    // const handleChange = name => event => {
    //     setLogValues({ ...ValuesLog, error: false, [name]: event.target.value })
    // }


    // const successSignup = () => {
    //     console.log(Success)
    //     return (
    //         <div className="row">
    //             <div className="col-md-6 offset-sm-3 text-left">
    //                 <div className="p-4 mb-4 text-sm text-white-700 
    //                    bg-green-100 rounded-lg dark:bg-red-200 dark:text-white-800 w-6/12 mx-auto"
    //                     style={{ display: Success ? "" : "none" }}>
    //                     New Name was Done successfully
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }
    // const errorSignup = () => {
    //     console.log(ErrorL)
    //     return (
    //         <div className="mt-4 row">
    //             <div className="col-md-6 offset-sm-3 text-left">
    //                 <div className="p-4 mb-4 text-sm text-red-700 
    //                    bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 w-6/12 mx-auto"
    //                     style={{ display: ErrorL ? "" : "none" }}>
    //                     {ErrorL}
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }


    // console.log(user, Token)
    // const Login = (event) => {
    //     event.preventDefault();
    //     setLogValues({ ...ValuesLog, ErrorL: false, loading: true })
    //     EditName(user._id, FirstName, LastName, Token)
    //         .then(data => {
    //             if (data.errors) {
    //                 setLogValues({ ...ValuesLog, ErrorL: data.errors[0].msg, Success: false })
    //             }
    //             else {
    //                 setLogValues({
    //                     FirstName: "",
    //                     LastName: "",
    //                     Success: true
    //                 })
    //             }
    //         })
    //         .catch(console.log("error in the Editing"))
    // }


    return (
        <>

            <div className="bg-gradient-to-tr from-[#22c1c3]
        to-[#fdbb2d] 
        to-red-600 text-gray-100"
            style={{ height: '100vh' }}>
            <Menu />
                <section className="flex flex-col justify-center mt-[3px] max-w-md mx-auto">
                    <div className="bg-tranparent rounded">
                        <div className="flex items-center justify-center mb-4">
                            <h1 className="text-3xl text-white">Edit</h1>
                        </div>
                        <form className="flex flex-col justify-center px-4 pb-3">
                            <div className="flex justify-between items-center mb-3">
                            </div>
                            <label className="text-sm font-medium text-black">First Name</label>
                            <input className="mb-3 mt-1 block w-full px-2 py-1
                             rounded-md text-sm text-dark" type='text'
                                name='FirstName'
                                // value={FirstName}
                                // onChange={handleChange('FirstName')} 
                                value={FirstName}
                                onChange={(e) => SetUserName(e.target.value)}
                                />


                            <label className="text-sm font-medium text-black">Last Name</label>
                            <input className="mb-3 mt-1 block w-full px-2 py-1
                             rounded-md text-sm " type='text'
                                name='LastName'
                                // value={LastName}
                                // onChange={handleChange('LastName')} 
                                value={LastName}
                                onChange={(e) => SetUserLName(e.target.value)}
                        
                                />

                            <button className="px-4 py-1 rounded-md shadow-lg 
                        bg-gradient-to-r from-pink-600 
                        to-red-600 text-gray-100"
                                onClick={Signup2}
                                type="submit">
                                <span >Submit</span>
                            </button>
                        </form>
                    </div>
                </section>
                {/* {errorSignup()}
                {successSignup()} */}
            </div>
        </>
    )
}