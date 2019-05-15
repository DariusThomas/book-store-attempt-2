import * as express from "express"
import Api from "./api"

const router = express.Router();

router.use("/Api",Api);

export default router