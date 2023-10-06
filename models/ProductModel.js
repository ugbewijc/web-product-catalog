/**
 * Product Database Model Class
 * 
 */

import runQuery from "./db.js";

class ProductModel{
    constructor(){}
    /**
     * Product Object:
     * `name` VARCHAR(255) NOT NULL,
     * `description` TEXT,
     * `image_url`  VARCHAR(255) NOT NULL,
     * `price` INT,
     * `category_id` BIGINT NOT NULL,
     */

    /**
     * getAllProduct -: retrives details of all products from the database
     * @returns sql rows
     */

    static async getAllProduct(){
        const sqlStatement = "SELECT * FROM products";
        return (await runQuery(sqlStatement));
    }

    /**
     *  addProduct: adds new product to the database
     * @param {Object} product 
     * @returns Quried results
     */
    static async addProduct(product){
        try {
            const sqlStatement = "INSERT INTO products SET ?";
            const values = {
                name: product.name,
                description: product.description,
                image_url: product.image,
                price: product.price,
                category_id: product.category
            };
            return (await runQuery(sqlStatement, values));        
        } catch (error) {
            throw ("Unable to update records");
        }
    }
    /**
     * updateProduct-: updates product database records 
     * @param {Object} product 
     * @returns successs message
     */
    static async updateProduct(product){
        try {
            const sqlStatement = "UPDATE products SET ? WHERE product_id = ?";
            const values = [
                {
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    category_id: product.category
                },
                product.id
            ]
            product?.image? (values[0]["image_url"] = product.image) : "";
            return (await runQuery(sqlStatement, values));    
        } catch (error) {
            throw ("unable to update records");
        }
    }

    static async deleteProduct(){
        // console.log("do you want to delete product");
    }

    static async getProductByCategory(id){
        try {
            const sqlStatement = "SELECT * FROM products WHERE category_id = ?";
            const value = [id];
            return (await runQuery(sqlStatement, value));   
        } catch (error) {
            throw ("Unable to Fetch Request");
        }
    }
}

export default ProductModel;