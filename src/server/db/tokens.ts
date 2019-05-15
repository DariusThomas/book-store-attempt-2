import { Query } from "./index"

const insertToken = (userid:number)=> Query("INSERT INTO tokens(userid) VALUES(?)",[userid]);

const updateToken =(id:number, token:string)=> Query("UPDATE tokens SET token =? WHERE id = ?",[token,id])

const validateToken = async(userid:number,id:number, token:string) => Query("SELECT * FROM tokens WHERE id =? AND userid=? AND token = ?",[id,userid,token])

const removeToken = async(userid:number)=> Query("DELETE from tokens where userid=? ",[userid])

export default {
    insertToken,
    updateToken,
    validateToken,
    removeToken
}