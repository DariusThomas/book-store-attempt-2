import * as express from "express"
import { HashPassword } from "../../utils/security/password"
import { CreateToken } from "../../utils/security/tokens"
import db from "../../db"
const router = express.Router();

router.post('/', async (req, res, next) => {
    let user = req.body
    let [ExistingEmail] = await db.User.userByEmail(user.email)
    if (ExistingEmail) {
        res.sendStatus(401)
    } else {
        try {
            user.password = HashPassword(req.body.password);
            let result: any = await db.User.registerUser(user.email, user.password,user.name);
            let token = await CreateToken({ userid: result.insertId });
            res.json({
                token,
                userid: result.insertId,
                role: "admin"
            });
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
})

export default router