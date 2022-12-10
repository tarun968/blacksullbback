import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    msg:"",
    user:"",
    Token:"",
    loading:"",
    error:"",
}

export const signUpUSer = createAsyncThunk("signupuser",async(body) => {
    console.log("body,",body)
    const res = await fetch("http://localhost:5000/user/signup", {
        method:'POST',
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(body)
    })
    return res.json()
})

export const signInUSer = createAsyncThunk("signinuser",async(body) => {
    console.log("body,",body)
    const res = await fetch("http://localhost:5000/user/login", {
        method:'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    return await res.json()
})

export const EditUSer = createAsyncThunk("EditUser",async(body) => {
    console.log("body,",body)
    const {FirstName, LastName, Token} = body
        const response = await fetch(`http://localhost:5000/${body.user._id}/editname`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${Token}`
            },
            body: JSON.stringify({FirstName,LastName})
        })
        return await response.json()
})



export const GetUSer = createAsyncThunk("EditUser",async(body) => {
    console.log("body,",body)
    const {Token, user} = body
    console.log("usder",user)

    const response = await fetch(`http://localhost:5000/${user._id}/user`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${Token}`
            },
        })
        return await response.json()
})
const authSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        addToken: (state,action) => {
            state.Token = localStorage.getItem("jwt")
        },
        // addUser: (state,action) => {
        //     state.user = localStorage.getItem("user")
        // },

        // if (localStorage.getItem("jwt")) {
        //     return JSON.parse(localStorage.getItem("jwt"))
        // }
        logout: (state,action) => {
            state.Token = null
            localStorage.clear()
        }
    },
    extraReducers:{
        [signInUSer.pending]: (state,action) =>{
            state.loading = true
        },
        [signInUSer.fulfilled]: (state,{payload:{error,msg,Token,user}})=>{
            state.loading = false
            if(error){
                state.error=error
            }
            else{
                state.msg = msg
                state.Token = Token
                state.user=user
                // localStorage.setItem("msg",msg)
                localStorage.setItem("jwt",JSON.stringify({Token,user}))
                // localStorage.setItem("jwt",Token)
            }
        },
        [signInUSer.rejected]: (state,action) => {
            state.loading = true
        },

        [signUpUSer.pending]: (state,action) =>{
            state.loading = true
        },
        [signUpUSer.fulfilled]: (state,{payload:{error,msg}})=>{
            state.loading = false
            if(error){
                state.error=error
            }
            else{
                state.msg = msg
            }
        },
        [signUpUSer.rejected]: (state,action) => {
            state.loading = true
        },




        [EditUSer.pending]: (state,action) =>{
            state.loading = true
        },
        [EditUSer.fulfilled]: (state,{payload:{error,msg}})=>{
            state.loading = false
            if(error){
                state.error=error
            }
            else{
                state.msg = msg
            }
        },
        [EditUSer.rejected]: (state,action) => {
            state.loading = true
        }
    }
})

export const {addToken
    // ,addUser
    ,logout} = authSlice.actions
export default authSlice.reducer