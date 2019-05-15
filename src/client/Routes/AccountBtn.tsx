import * as React from "react"
import {useContext} from "react"
import {Context} from "../utils/context"
import {Link } from "react-router-dom"
import { fwt } from "../utils/api"
import {RouteComponentProps} from "react-router-dom"
const AccBtn: React.SFC<IAccBtnProp> = (props) =>{

    const {user, token ,setUser, setToken} = useContext(Context)
    async function LogoutFunc(){
        try{
           let res = await fwt(token,`/Auth/Logout/${user.userid}`,"Delete")
           if(res){
            localStorage.clear()
            setUser({
                userid:"",
                role:""})
                setToken("")
                props.history.push("/")
            }
        }catch(e){
            console.log(e)
        }
    }

    if(user.userid == ""){
    return(
       <Link className="btn btn-primary m-2" to ="/Login">Login</Link>
    )
    }else{
        return(
        <button onClick={LogoutFunc}className="btn btn-primary m-2">Logout</button>
        )
    }
}

interface IAccBtnProp extends RouteComponentProps{

}

export default AccBtn
