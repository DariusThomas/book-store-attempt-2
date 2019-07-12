import * as React from "react"
import { useState, useEffect } from "react"
import { Link, RouteComponentProps } from "react-router-dom"
import { Book } from "./Allbook"
import { fwt } from "../utils/api"
import { Context } from "../utils/context"
const Book: React.SFC<IBook> = (props) => {
 
    const { user, token } = React.useContext(Context)

    const [book, setBook] = useState<Book>({
        id: null,
        categoryid: null,
        title: null,
        author: null,
        price: 0.00,
        _created: null,
        category: null
    })
    useEffect(() => {
        getBook()
    }, [])

    async function getBook() {
        try {
            let res = await fwt(token, `/Api/Books/${props.match.params.id}`)
            let [data] = await res.json()
            if(data){
                    setBook(data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    if (user.role != "admin") {
        return (
            <>
                <div className="p-3">
                    <h2 className="text-center">Book Info:</h2>
                    <h1 >{book.title}</h1>
                    <h5> Genre: {book.category}</h5>
                    <h3>By {book.author}</h3>
                    <p>Price: ${book.price}</p>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="p-3">
                    <h2 className="text-center">Book Info:</h2>
                    <h1 >{book.title}</h1>
                    <h5> Genre: {book.category}</h5>
                    <h3>By {book.author}</h3>
                    <p>Price: ${book.price}</p>
                    <Link className="btn btn-primary" to={`/books/${props.match.params.id}/update`}>Edit Details</Link>
                </div>
            </>
        )
    }

}

interface IBook extends RouteComponentProps<{ id: string }> {

}
export default Book
