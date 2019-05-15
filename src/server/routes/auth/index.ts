import * as express from "express"
import Login from "./login"
import Logout from "./logout"
import Register from "./register"

const router = express.Router();

router.use("/Login",Login)
router.use("/Logout",Logout)
router.use("/Register",Register)

export default router;