import * as jwt from "jsonwebtoken"
import * as crypto from "crypto"
import db from "../../db"
import config from "../../config"

export const CreateToken = async (payload:IPayload)=>{
    try{
    let tokenid: any = await db.Tokens.insertToken(payload.userid);
    payload.accesstokenid = tokenid.insertId;
    payload.unique = crypto.randomBytes(32).toString('hex');
    let token =  await jwt.sign(payload,config.auth.secret)
    await db.Tokens.updateToken(payload.accesstokenid,token);
    return token;
    }catch(e){
        throw(e)
    }

};

export const ValidateToken = async (token:string) =>{
    let payload: IPayload = <IPayload>jwt.decode(token);

    let [accesstokenid]= await db.Tokens.validateToken(payload.userid,payload.accesstokenid,token);
    if(!accesstokenid){
        throw new Error("Invalid Token!")
    }else {
        return payload
    }
}


interface IPayload {
    [key:string]:any;
    userid:number;
    unique?: string
}
