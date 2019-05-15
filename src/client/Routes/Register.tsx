import * as React from "react"
import { useRef } from "react"
import { fwt } from "../utils/api"
import { Context } from "../utils/context"
import {RouteComponentProps, Link } from "react-router-dom"

const Register: React.SFC<IRegisterProps> = (props) => {
    const name = useRef(null)
    const email = useRef(null)
    const password = useRef(null)
    const { token, setToken, setUser } = React.useContext(Context)

    async function submitRegister(e: any) {
        e.preventDefault();
        try {
            let registerBody = {
                name: name.current.value,
                email: email.current.value,
                password: password.current.value
            }
            let res = await fwt(token, "/Auth/Register", "POST", registerBody)
            if (res) {
                let data = await res.json()
                setToken(data.token)
                setUser({userid:data.userid,role:data.role})
                props.history.push("/")
            }
        } catch (e) {
            clearInputs()
            console.log(e)
        }
    }
    function clearInputs(){
        name.current.value = null;
        email.current.value = null;
        password.current.value = null;
    }
    return (
        <>
            <div className="h-75 d-flex justify-content-center align-items-center">
                <div className="p-4 d-flex justify-content-center align-items-center border border-info rounded">
                    <div>
                        <h2 className="Text-center mb-2">Register</h2>
                        <form onSubmit={submitRegister}>
                            <label htmlFor="loginName" className="form-contorl">Name</label>
                            <input ref={name} id="loginName" className="form-control" placeholder="Enter Name" type="name" />
                            <label htmlFor="loginEmail" className="form-contorl">Email</label>
                            <input ref={email} id="loginEmail" className="form-control" placeholder="Enter email" type="email" />
                            <label htmlFor="loginPassword">Password</label>
                            <input ref={password} id="loginPassword" className="form-control" placeholder="Enter password" type="password" />
                            <input className="btn btn-primary m-1" type="submit" />
                        </form>
                        <div>
                        </div>
                        <Link to ="/Login">I already have an account</Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Register

interface IRegisterProps extends RouteComponentProps<{id:string}>{

}