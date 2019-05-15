import { Query } from "./index"

const allCategories = async()=> Query("SELECT * FROM categories ",[])

const oneCategory = async(id:number)=> Query("SELECT * FROM categories  WHERE id =?",[id])

export default{
    allCategories,
    oneCategory
}