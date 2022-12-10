import React, { useState } from "react";
import Menu from "./Menu/Menu";
import { signin, signup } from "../apihelper/loginapi";
import { useDispatch } from "react-redux";
import { signUpUSer } from "../redux/authSlice";

export default function SignIn() {
    const dispatch = useDispatch()
    const Signup2 = (event) => {
        event.preventDefault();
        console.table(Email, LastName, Password, FirstName)
        dispatch(signUpUSer({ Email, LastName, Password, FirstName }))
    }
    const [Email, SetUserEmail] = useState("")
    const [LastName, SetUserLName] = useState("")
    const [FirstName, SetUserName] = useState("")
    const [Password, SetUserPassword] = useState("")
    const [error,setError] = useState("")
    const [sucsess,setSucess] = useState(false)
    // const [Values, setValues] = useState({
    //     Email: "",
    //     Password: "",
    //     FirstName: "",
    //     LastName: "",
    //     error: "",
    //     success: false
    // })
    // const { Email, Password, FirstName, LastName, error, success } = Values
    // const handleChange = name => event => {
    //     setValues({ ...Values, error: false, [name]: event.target.value })
    // }
    // const successSignup = () => {
    //     console.log(success)
    //     return (
    //         <div className="row">
    //             <div className="col-md-6 offset-sm-3 text-left">
    //                 <div className="p-4 mb-4 text-sm text-white-700 
    //                 bg-tranparent rounded-lg w-6/12 mx-auto border border-teal-500"
    //                     style={{ display: success ? "" : "none" }}>
    //                     New account was created successfully
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }
    // const errorSignup = () => {
    //     console.log(error)
    //     return (
    //         <div className="mt-4 row">
    //             <div className="col-md-6 offset-sm-3 text-left">
    //                 <div className="p-4 mb-4 text-sm text-white-700 
    //                 bg-tranparent rounded-lg w-6/12 mx-auto border border-teal-500"
    //                     style={{ display: error ? "" : "none" }}>
    //                     {error}
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }


    const SignUp = event => {
        event.preventDefault();
        // setValues({ ...Values, error: false })
        signup({ Email, Password, FirstName, LastName, })
            .then(data => {

                if (data.errors) {
                    // setValues({
                    //     Email: "",
                    //     Password: "",
                    //     FirstName: "",
                    //     LastName: "",
                    //     error: data.errors[0].msg,
                    //     success: false
                    // })
                }

                else {
                    console.log('came in else')
                    // setValues({
                    //     Email: "",
                    //     Password: "",
                    //     FirstName: "",
                    //     LastName: "",
                    //     error: "",
                    //     success: true
                    // })
                    console.log('xites')
                }
            })
            .catch(err => console.log(err, 'error in the signup'))
    }

    return (
        <div className="bg-gradient-to-tr from-[#22c1c3]
        to-[#fdbb2d] 
        to-red-600 text-gray-100"
            style={{ height: '100vh' }}>
            <Menu />
            <div className="">
                <section className="flex flex-col justify-center mt-[3px] max-w-md mx-auto">
                    <div className="bg-tranparent mt-5 rounded">
                        <div className="mt-4 flex items-center justify-center mb-4">
                            <h1 className="text-3xl text-white">Sign In</h1>
                        </div>
                        <form className="mt-4 border-b border-teal-500
                         rounded-lg flex flex-col justify-center px-4 pb-3 bg-tranparent">
                            <div className="flex justify-between items-center mb-3">
                            </div>
                            <label className="text-sm font-medium text-white">Email Id</label>
                            <input className="
                            appearance-none bg-transparent 
                            border-none w-full 
                            text-gray-700 mr-3 leading-tight focus:outline-none
                            mb-3 px-2 py-1
                            " type="email" name="Email"
                                value={Email}
                                onChange={(e) => {SetUserEmail(e.target.value)}}
                            // onChange={handleChange('Email')}
                            // value={Email}
                            />

                            <label className="text-sm font-medium text-white">First Name</label>
                            <input className="
                            appearance-none bg-transparent 
                            border-none w-full 
                            text-gray-700 mr-3 leading-tight focus:outline-none
                            mb-3 px-2 py-1" type='text'
                                name='FirstName'
                                value={FirstName}
                                onChange={(e) => SetUserName(e.target.value)}
                            // onChange={handleChange('FirstName')} 
                            />


                            <label className="text-sm font-medium text-white">Last Name</label>
                            <input className="
                            appearance-none bg-transparent 
                            border-none w-full 
                            text-gray-700 mr-3 leading-tight focsus:outline-none
                            mb-3 px-2 py-1" type='text'
                                name='LastName'
                                value={LastName}
                                onChange={(e) => SetUserLName(e.target.value)}
                            // value={LastName}
                            // onChange={handleChange('LastName')} 
                            />


                            <label className="text-sm font-medium text-white">Password</label>
                            <input className="
                            appearance-none bg-transparent 
                            border-none w-full 
                            text-gray-700 mr-3 leading-tight focus:outline-none
                            mb-3 px-2 py-1" type='password' name='Password'
                                // onChange={handleChange('Password')}
                                // value={Password} 
                                value={Password}
                                onChange={(e) => SetUserPassword(e.target.value)}
                            />

                            <button className="px-4 py-1 rounded-md shadow-lg 
                        bg-gradient-to-r from-[#22c1c3]
                        to-[#fdbb2d] text-gray-100"
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
        </div>
    )
}