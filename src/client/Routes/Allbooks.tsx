import * as React from "react"
import { useState, useEffect, useContext} from "react"
import { Link } from "react-router-dom"
import { fwt } from "../utils/api"
import {Context} from "../utils/context"

const AllBooks: React.SFC<IAllBooks> = (props) => {

    const{token} = React.useContext(Context)
   
    const [books, setBooks] = useState<Array<Book>>([])
    useEffect(() => {
        getBooks()
    }, [])

    async function getBooks() {
        try{
          let res = await fwt(token,'/Api/Books') 
          let data = await res.json()
            setBooks(data)
        }catch(e){
            console.log(e)
        }
    }
  
    return (
        <>
        <div >
        {books.map((book,i)=>{
           return(
               <div className=" border border-info rounded m-2 p-3" key={i}>
           <h2 key={book.id}>{book.title}</h2>
           </div>
            ) 
        })}
        </div>
        </>
    )
}

interface IAllBooks {

}

export interface Book {
    id: number,
    category:string,
    categoryid: number,
    title: string,
    author: string,
    price: number,
    _created:string
}
export default AllBooks