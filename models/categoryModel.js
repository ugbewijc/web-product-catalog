/**
 * CategoryModel Class
 */
import pool from "./db.js";

class CategoryModel{
    constructor(){
    }
    /**
     * runQuery -: runs sql queries for anything related to category
     * @param {string} sqlQuery, sql statement
     * @param {array} values, parameter for the statement
     */

    static async runQuery(sql, values=[]){
        return new Promise((resolve, reject) => {
            pool.query(sql, values, (error, results) => {
              if (error) {
                return reject(error);
              }
              return resolve(results);
            });
        });
    }

    /**
     * getAllCategories -: retrives details of all categories from the database
     * @returns sql rows
     */

    static async getAllCategories(){
        const sqlStatement = "SELECT * FROM categories";
        return (await this.runQuery(sqlStatement));
    }

    /**
     * getCategory(category) -: retrives details of a category from DB
     * @param {string} category _- category to search for  
     * @returns  results from the sql query
     */

    static async getCategory(category){
        const sqlStatement = "SELECT * FROM categories WHERE name = ?";
        const values =[category];
        return (await this.runQuery(sqlStatement, values));
    }

    /**
     * addCategory -: add new category into the DB
     * @param {string} category -: category name 
     * @returns queried results
     */

    static async addCategory(category){
        const sqlStatement = "INSERT INTO categories SET ?";
        const values = {name: category};
        return (await this.runQuery(sqlStatement, values));
    }

    static async updateCategory(id, updatedname){
        const sqlStatement = "UPDATE categories SET ? WHERE id = ?";
        const values = [{name : updatedname},id]
        return (await this.runQuery(sqlStatement, values));
    }
}

export default CategoryModel;