import * as passport from "passport"
import * as BearerStrategy from "passport-http-bearer"

import { ValidateToken } from "../utils/security/tokens"
import db from "../db"

let bs = new BearerStrategy.Strategy(async (token, done) => {
    try {
        let payload = await ValidateToken(token);
        let [user] = await db.User.userById(payload.userid)
        if(user){
            done(null,user);
        }else {
            done(null,false)
        }
    } catch (e) {
        done(e);
    }
});


passport.use(bs)
