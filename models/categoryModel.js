/**
 * CategoryModel Class
 */
import runQuery from "./db.js";

class CategoryModel{
    constructor(){}

    /**
     * getAllCategories -: retrives details of all categories from the database
     * @returns sql rows
     */

    static async getAllCategories(){
        const sqlStatement = "SELECT * FROM categories";
        return (await runQuery(sqlStatement));
    }

    /**
     * getCategory(category) -: retrives details of a category from DB
     * @param {string} category _- category to search for  
     * @returns  results from the sql query
     */

    static async getCategory(category){
        const sqlStatement = "SELECT * FROM categories WHERE name = ?";
        const values =[category];
        return (await runQuery(sqlStatement, values));
    }

    /**
     * addCategory -: add new category into the DB
     * @param {string} category -: category name 
     * @returns queried results
     */

    static async addCategory(category){
        const sqlStatement = "INSERT INTO categories SET ?";
        const values = {name: category};
        return (await runQuery(sqlStatement, values));
    }

    static async updateCategory(id, updatedname){
        const sqlStatement = "UPDATE categories SET ? WHERE id = ?";
        const values = [{name : updatedname},id]
        return (await runQuery(sqlStatement, values));
    }
}

export default CategoryModel;