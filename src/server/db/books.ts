import { Query } from "./index"

const allBooks = async() =>Query("SELECT * FROM books",[])

const addBook = async(categoryid:number,title:string,author:string,price:number)=> Query("INSERT INTO books (categoryid,title,author,price) values(?,?,?,?)",[categoryid,title,author,price])

const oneBook = async(id:number)=> Query("SELECT b.*, c.name AS category FROM books b JOIN categories c ON b.categoryid=c.id WHERE b.id = ?",[id])

const updateBook = async(id:number,categoryid:number,title:string,author:string,price:number) => Query("UPDATE books SET categoryid=?, title=?, author=?, price=? WHERE id =?",[categoryid,title,author,price, id])

const deleteBook = async (id: number) => Query('DELETE FROM books WHERE id =?', [id])

export default{
    allBooks,
    addBook,
    oneBook,
    updateBook,
    deleteBook
}