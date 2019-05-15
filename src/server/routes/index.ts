import * as express from "express"
import Api from "./api"
import Auth from "./auth"
const router = express.Router();

router.use("/Api",Api);
router.use("/Auth",Auth);
export default router