/**
 * 
 * Category Controller
 */

import CategoryModel from "../models/categoryModel.js";


class CategoryController{
    constructor(){
    }

    /**
     * newCategory -: adds a new category, 
     *      controller for POST /categories
     * @param {Request} req - request object
     * @param {Response} res - response object
     * 
     */

    static async newCategory(req, res){
        /**
         *  categoryName is required and unique
         * Get category name from user
         * Return Error("Inavlid Credentials") if category name is not provided 
         */
        const categoryName = req.body? req.body.categoryName.toLowerCase() : null;
        
        if (!categoryName){
            return res.status(400).json({error : 'Invalid Credentials'});
        }

        /**
         * validate category name to be unique
         */
        const category = await CategoryModel.getCategory(categoryName);
        // console.log(category[0].name);
        if (category[0]?.name){
            return res.status(400).json({error : 'Category Already exist'});
        }
        /**
         * Add new category to the database
         * return category ID and name
         */
        const newCategory = await CategoryModel.addCategory(categoryName);
        return res.status(201).json({id: newCategory.insertId, name: categoryName})
    }

    /**
     * getAllCategory -: returns list of all category
     *          controller for GET /categories
     * @param {Request} req - request object
     * @param {Response} res - response object
     * 
     */
    static async getAllCategory(req, res){
        const categories = await CategoryModel.getAllCategories();
        return res.status(200).json({data: categories});

    }

    /**
     * updateCategory -: update an existing category by category ID
     * @param {Request} req - request object 
     * @param {Response} res - response object
     */
    static async updateCategory(req, res){
        
        /**
         * Get Category ID and the new category name
         * 
         */
        const categoryId = req.params? req.params['id']: null;
        const categoryName = req.body? req.body.categoryName.toLowerCase() : null;
        
        /**
         * validate category name and id 
         */
        if (!categoryName){
            return res.status(400).json({error : 'Invalid Credentials'});
        }
        if (!categoryId){
            return res.status(400).json({error : 'Invalid Credentials'});
        }

        /**
         * update the database with the new name
         * return detail of the updated category
         */

        const updatedCategory = await CategoryModel.updateCategory(categoryId, categoryName);
        if(!updatedCategory.affectedRows){
            return res.status(400).json({error : 'Could not update records'});
        }
        return res.status(201).json({data:[{id: categoryId, name: categoryName}]});
    }
}
export default CategoryController;