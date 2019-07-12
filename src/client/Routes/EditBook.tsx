import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { RouteComponentProps, Redirect } from "react-router-dom"
import { Book } from "./Allbook"
import { fwt } from "../utils/api"
import { Context } from "../utils/context"
const EditBook: React.SFC<IEditBook> = (props) => {
    const { user, token } = React.useContext(Context)


    if (user.role != "admin") {
        return <Redirect to='/' />;
    }

    const Category = useRef(null)
    const Title = useRef(null)
    const Author = useRef(null)
    const Price = useRef(null)
    const [categories, setCategories] = useState<Array<Category>>([])
    const [book, setBook] = useState<Book>({
        id: null,
        categoryid: null,
        title: null,
        author: null,
        price: null,
        _created: null,
        category: null
    });

    useEffect(() => {
        getBook();
        getCategories()
    }, [])

    useEffect(() => {
        originalBookInfo()
    }, [book])


    function originalBookInfo() {
        Title.current.value = book.title;
        Author.current.value = book.author;
        Price.current.value = book.price;
        Category.current.value = book.categoryid;
    }

    async function getCategories() {
        try {
            let res = await fwt(token, '/Api/Categories')
            let data = await res.json()
            setCategories(data)
        } catch (e) {
            console.log(e)
        }
    }

    async function getBook() {
        try {
            let res = await fetch(`/Api/Books/${props.match.params.id}`)
            let [data] = await res.json()
            if (data) {
                setBook(data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function submitEdit(e: any) {
        e.preventDefault()
        let editedBook = {
            bookid: book.id,
            categoryid: Category.current.value,
            title: Title.current.value,
            author: Author.current.value,
            price: parseFloat(Price.current.value)
        }
        try {
            await fwt(token, "/Api/Books", "PUT", editedBook)
            props.history.push("/")
        } catch (e) {
            clearInputs()
            console.log(e)
        }
    }

    async function DeleteBook() {
        try {
            await fwt(token, `/Api/Books/${props.match.params.id}`, "DELETE")
            props.history.push("/")
        } catch (e) {
            console.log(e)
        }
    }

    function clearInputs() {
        Title.current.value = null;
        Author.current.value = null;
        Price.current.value = null;
        Category.current.value = "no value";
    }

    return (
        <>
            <div className=" h-75 d-flex justify-content-center align-items-center">
                <div className=" d-flex flex-column justify-content-center align-items-center border border-info rounded pt-4 px-5">
                    <h2 className="text-center">Edit Book Info:</h2>
                    <form onSubmit={submitEdit}>
                        <select ref={Category} className="form-control" defaultValue="no value" placeholder="..." >
                            <option disabled value="no value">Select A Category</option>
                            {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                        </select>
                        <input ref={Title} className="d-block m-2 form-control" type="text" placeholder="title" />
                        <input ref={Author} className="d-block m-2 form-control" type="text" placeholder="author" />
                        <input required ref={Price} className="d-block m-2 form-control" type="text" placeholder="price" />
                        <input className="d-inline-block m-2 btn btn-primary" type="submit" value="submit" />
                        <button onClick={DeleteBook} className=" d-inline-block btn btn-danger">Delete</button>
                    </form>
                </div>
            </div>

        </>
    )
}

interface IEditBook extends RouteComponentProps<{ id: string }> {

}

export interface Category {
    id: number,
    name: string
}
export default EditBook