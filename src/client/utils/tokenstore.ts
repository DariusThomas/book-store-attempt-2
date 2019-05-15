import * as React from "react"

function tokenStore(){
    const [user, setUserState] = React.useState({
        userid: localStorage.getItem("userid") || "",
        role: localStorage.getItem("role") || "",
    });

    const[token,setTokenState] =  React.useState(localStorage.getItem("token") || "")

    const setUser =(user:{userid:string, role:string})=>{
        localStorage.setItem("userid", user.userid)
        localStorage.setItem("role", user.role)
        setUserState(user)
    }

    const setToken = (token:string)=>{
        localStorage.setItem("token", token)
        setTokenState(token)
    }
    
    return {user,setUser, setToken, token}
}
export default tokenStore
