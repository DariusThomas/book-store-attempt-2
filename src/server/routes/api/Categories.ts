import * as express from "express"
import db from "../../db"

const router = express.Router()

router.get("/:id?", async(req,res,next)=>{
    let categoryid = req.params.id;
    try{
        if(categoryid){
            res.json(await db.Categories.oneCategory(categoryid))
        }else{
            res.json( await db.Categories.allCategories())
        }
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
})
export default router