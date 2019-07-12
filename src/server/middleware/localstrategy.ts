import * as passport from "passport"
import * as LocalStrategy from "passport-local"
import db from "../db"
import { ComparePassword} from "../utils/security/password"
import { CreateToken } from "../utils/security/tokens"


let ls = new LocalStrategy.Strategy({
    usernameField: "email"
}, async (email, password, done) => {
    try {
        let [user]: any = await db.User.userByEmail(email);
        if (user && ComparePassword(password, user.password)) {
            let token = await CreateToken({ userid: user.id })
            let response = {
                token,
                userid: user.id,
                role: user.role
            }
            done(null, response);
        } else {
            done(null, false)
        }
    } catch (e) {
        done(e)
    }
})

passport.use(ls)
