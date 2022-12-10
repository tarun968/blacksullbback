import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { isAuthenticated } from "../../apihelper/loginapi";
export default function Menu() {

    const [showMenu, SetShowMenu] = useState(false)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const signout = (event) => {
        event.preventDefault();
        dispatch(logout())        
        navigate("/")  
    }

    return (
        <div className='p-4'>
            <div className="max-w-[1240px] flex items-center 
            py-[15px] mt-[12px] px-[10px] justify-between mx-auto">
                <div className="text-white text-3xl font-bold">
                    BlaccSkull
                </div>
                {
                    showMenu ?
                        <AiOutlineClose className="text-white md:hidden block"
                            onClick={() => SetShowMenu(!showMenu)}
                        />
                        :
                        <AiOutlineMenu className="text-white md:hidden block"
                            onClick={() => SetShowMenu(!showMenu)}
                        />
                }
                <ul className="hidden md:flex text-white gap-10">
                    <Link to='/Edit' style={{ display: isAuthenticated() ? "" : "none", }}>
                        Edit
                    </Link>
                    <Link to='/' style={{ display: isAuthenticated() ? "none" : "", }}>
                        Home
                    </Link>
                    <Link to='/Signin' style={{ display: isAuthenticated() ? "none" : "", }}>
                        Signin
                    </Link>
                    {isAuthenticated() &&
                        (
                            <Link onClick={signout} to='/'>LogOut</Link>
                        )}
                    <Link to="/About">
                        About U
                    </Link>
                    <Link to="/Contact">
                        Contactus
                    </Link>
                </ul>


                <ul className={`md:hidden bg-[black] 
                text-white gap-10 fixed 
                top-[112px] w-full 
                ${showMenu ? 'left-[0]' : 'left-[-100%]'}`
                }>

                    <li className="p-3">
                        <Link to='/' style={{ display: isAuthenticated() ? "none" : "", }}>
                            Edit
                        </Link>
                    </li>
                    <li className="p-3">
                        <Link to="/" className="p-3" style={{ display: isAuthenticated() ? "none" : "", }}>
                            Home
                        </Link>
                    </li>
                    <li className="p-3">
                        <Link to="/Signin" className="p-3" style={{ display: isAuthenticated() ? "none" : "", }}>
                            Signin
                        </Link>
                    </li>

                    {isAuthenticated() &&
                        (<li className="p-3">
                            <Link className="p-3" onClick={signout} to='/'>LogOut</Link>
                        </li>)}
                    
                    <li className="p-3">
                        <Link to="/About" className="p-3">
                            About U
                        </Link>
                    </li>

                    <li className="p-3">

                        <Link to="/Contact" className="p-3">
                            Contactus
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}