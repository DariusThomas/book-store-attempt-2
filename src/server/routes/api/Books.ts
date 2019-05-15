import * as express from "express"
import db from "../../db"

const router = express.Router();

export const isAdmin:express.RequestHandler = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.sendStatus(401)
    } else {
        return next();
    }
}

router.get("/:id?", async (req, res, next) => {
    let bookid = req.params.id
    try {
        if (bookid) {
            res.json(await db.Books.oneBook(bookid));
        } else {
            res.json(await db.Books.allBooks());
        }
    } catch (e) {
        res.sendStatus(500)
    }
})

router.post("/",isAdmin, async (req, res, next) => {
    let categoryid = req.body.categoryid;
    let title = req.body.title;
    let author = req.body.author;
    let price = req.body.price
    try {
        await db.Books.addBook(categoryid, title, author, price)
        res.sendStatus(200)
    } catch (e) {
        console.log(e);
        res.sendStatus(500)
    }
})

router.put("/",isAdmin, async (req, res, next) => {
    let bookid = req.body.bookid;
    let categoryid = req.body.categoryid;
    let title = req.body.title;
    let author = req.body.author;
    let price = req.body.price;
    try {
        await db.Books.updateBook(bookid, categoryid, title, author, price)
        res.sendStatus(200)
    } catch (e) {
        console.log(e);
        res.sendStatus(500)
    }
})


router.delete("/:id",isAdmin, async (req, res, next) => {
    try {
        let bookid = req.params.id
        await db.Books.deleteBook(bookid)
        res.sendStatus(200)
    } catch (e) {
        console.log(e);
        res.sendStatus(500)
    }
})




export default router