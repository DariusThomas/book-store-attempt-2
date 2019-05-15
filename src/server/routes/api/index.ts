import * as express from "express"
import * as passport from "passport"
import Books from "./Books"
import Categories from "./Categories"

const router = express.Router()

router.use('/',(req, res, next) => {
    passport.authenticate('bearer', (err, user, info) => {
        if (user) {
            req.user = user;
        }
        return next()
    })(req, res, next);
});

router.use("/Books",Books)
router.use("/Categories",Categories)

export default router