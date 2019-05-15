import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { fwt } from "../utils/api"
import { Context } from "../utils/context"
import { RouteComponentProps, Redirect } from "react-router-dom"

const AddBooks: React.SFC<IAllBooks> = (props) => {

    const { user, token } = React.useContext(Context)

    if (user.role != "admin") {
        return <Redirect to='/' />;
    }

    const [categories, setCategories] = useState<Array<Category>>([]);

    useEffect(() => {
        getCategories()
    }, [])


    const Category = useRef(null)
    const Title = useRef(null)
    const Author = useRef(null)
    const Price = useRef(null)

    async function getCategories() {
        try {
            let res = await fwt(token, '/Api/Categories')
            let data = await res.json()
            setCategories(data)
        } catch (e) {
            console.log(e)
        }
    }

    async function submitBook(e: any) {
        e.preventDefault()
        let newBook = {
            categoryid: Category.current.value,
            title: Title.current.value,
            author: Author.current.value,
            price: parseFloat(Price.current.value)
        }
        try {
            await fwt(token, "/Api/Books", "POST", newBook)
            clearInputs()
            props.history.push("/")
        } catch (e) {
            clearInputs()
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
                    <h2 className="text-center">Add New Book</h2>
                    <form onSubmit={submitBook}>
                        <select ref={Category} className="form-control" defaultValue="no value" placeholder="..." >
                            <option disabled value="no value">Select A Category</option>
                            {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                        </select>
                        <input ref={Title} className="d-block m-2 form-control" type="text" placeholder="title" />
                        <input ref={Author} className="d-block m-2 form-control" type="text" placeholder="author" />
                        <input required ref={Price} className="d-block m-2 form-control" type="text" placeholder="price" />
                        <input className="d-block m-2 btn btn-primary" type="submit" value="submit" />
                    </form>
                </div>
            </div>

        </>
    )

}

interface IAllBooks extends RouteComponentProps<{ id: string }> {

}

export interface Category {
    id: number,
    name: string
}
export default AddBooks