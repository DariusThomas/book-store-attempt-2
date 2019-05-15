import * as express from "express"
import * as passport from "passport"

const router = express.Router();

router.post("/", (req, res, next) => {
    passport.authenticate("local", (err, User, info) => {
        if (err) {
            return res.sendStatus(500);
        };
        if (!User) {
            return res.sendStatus(401);
        } else {
            return res.json(User)
        }
    })(req, res, next)
});

export default router