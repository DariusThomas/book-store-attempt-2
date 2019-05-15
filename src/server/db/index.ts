import * as mysql from "mysql"
import config from "../config"
import Books from "./books"
import Categories from "./categories"
import Tokens from "./tokens"
import User from "./user"

export const Connection = mysql.createPool(config.mysql);

export const Query = (query: string, values?:Array<string|number>) =>{
    return new Promise<Array<any>>((resolve,reject)=>{
        Connection.query(query,values, (err,result)=>{
            if(err){
                reject(err)
            }else{
                return resolve(result)
            }
        })
    })
}

export default{
    Books,
    Categories,
    Tokens,
    User
}