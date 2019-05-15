import * as React from "react"
import {useContext} from "react"
import {Context} from "../utils/context"
import {Link } from "react-router-dom"

import {RouteComponentProps} from "react-router-dom"
const AddBookBtn: React.SFC<IAddBookBtnProp> = (props) =>{

    const {user} = useContext(Context)
    if(user.role != "admin"){
    return(
       <></>
    )
    }else{
        return(
            <Link className="btn btn-primary m-2" to="/booksnew">AddBook</Link>
        )
    }
}

interface IAddBookBtnProp extends RouteComponentProps{

}

export default AddBookBtn
