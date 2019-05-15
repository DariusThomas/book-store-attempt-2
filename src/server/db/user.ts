import {Query} from "./index"

const registerUser = (email:string,passowrd:string,name:string) =>Query("INSERT INTO users(email,password,name) VALUES(?,?,?)",[email,passowrd,name])

const userByEmail = async (email:string) => Query("Select * From users where email = ?",[email]);

const userById = async (id:number) => Query("Select * From users where id = ?",[id])

export default{
    registerUser,
    userByEmail,
    userById
}