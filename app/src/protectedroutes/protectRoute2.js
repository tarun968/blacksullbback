import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {isAuthenticated } from "../apihelper/loginapi";
export default function ProtectedRoute2(){
    let {Token} = isAuthenticated()
    return (
        Token ? <Navigate to='/Edit' /> : <Outlet/>
    )
}