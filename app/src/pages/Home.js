import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu/Menu";
import { useNavigate } from "react-router-dom";
import { signin, isAuthenticated, authenticate } from "../apihelper/loginapi";
import { useDispatch } from "react-redux";
import { signInUSer } from "../redux/authSlice";

export default function Home() {
    const navigate = useNavigate()
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [didRedirect, SetRedirect] = useState(false)

    const dispatch = useDispatch()
    const Signin = (event) => {
        event.preventDefault();
        dispatch(signInUSer({ Email, Password })).then(
            s => {
                console.log("sss",s.payload.msg)
                if (s.payload.msg === 'Logged in'){
                    console.log("sss",)
                navigate("/Edit")   
                }
            }
        )
    }
    // const [ValuesLog, setLogValues] = useState({
    //     Email: "",
    //     Password: "",
    //     ErrorL: "",
    //     loading: false,
    //     didRedirect: false
    // })
    // const { Email, Password, ErrorL, loading, didRedirect } = ValuesLog
    // const handleChange = name => event => {
    //     setLogValues({ ...ValuesLog, error: false, [name]: event.target.value })
    // }

    // const didRedirectlogin = () => {
    //     if (didRedirect) {
    //         return (
    //             <Navigate to="/Edit" />
    //         )
    //     }
    // }

    // const { user } = isAuthenticated()
    // console.log(user)
    // const Login = (event) => {
    //     event.preventDefault();
    //     setLogValues({ ...ValuesLog, ErrorL: false, loading: true })
    //     signin({ Email, Password })
    //         .then(data => {
    //             if (data.error) {
    //                 setLogValues({ ...ValuesLog, ErrorL: data.error, loading: false })
    //             }
    //             else {
    //                 authenticate(data, () => {
    //                     setLogValues({
    //                         ...ValuesLog,
    //                         didRedirect: true
    //                     })
    //                 })
    //             }
    //         })
    //         .catch(console.log("error in the signin"))
    // }


    return (
        <div className='bg-gradient-to-tr from-[#22c1c3]
        to-[#fdbb2d] 
        to-red-600 text-gray-100'
            style={{ height: '100vh' }}>
            <Menu />
            <div>
                <section className="flex flex-col justify-center mt-[52px] max-w-md mx-auto">
                    <div className="bg-transparent rounded">
                        <div className="flex items-center justify-center mb-4">
                            <h1 className="text-3xl text-white">Log In</h1>
                        </div>
                        <form className="border-b border-teal-500
                         rounded-lg flex flex-col justify-center px-4 pb-3">
                            <div className="flex justify-between items-center mb-3">
                            </div>
                            <label className="text-sm font-medium text-grey">Email Id</label>
                            <input className="appearance-none bg-transparent 
                            border-none w-full 
                            text-gray-700 mr-3 leading-tight focus:outline-none
                            mb-3 px-2 py-1" type="email" name="Email"
                                value={Email}
                                onChange={(e) => { setEmail(e.target.value) }}

                            // onChange={handleChange('Email')}
                            // value={Email}
                            />
                            <label className="text-sm font-medium text-grey">Password</label>
                            <input className="appearance-none bg-transparent 
                            border-none w-full 
                            text-gray-700 mr-3 leading-tight focus:outline-none
                            mb-3 px-2 py-1" type='password' name='Password'
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}

                            // onChange={handleChange('Password')}
                            // value={Password} 
                            />

                            <button className="px-4 py-1 rounded-md shadow-lg 
                        bg-gradient-to-r from-[#22c1c3]
                        to-[#fdbb2d] text-gray-100"
                                onClick={Signin}
                                type="submit">
                                <span >Submit</span>
                            </button>
                        </form>
                    </div>
                </section>
                {/* {didRedirectlogin()} */}
            </div>
        </div>
    )
}
