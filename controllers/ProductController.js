/**
 * Product Controller
 */

import Busyboy from "busboy";
import { createWriteStream, existsSync, unlinkSync } from "fs";
import {v4 as uuidv4 } from 'uuid';
import ProductModel from "../models/ProductModel.js";
class ProductController {
  constructor(){}
  
  /**
   * getAllProduct -: retruns dettails of all products
   * @param {Request} req : request object
   * @param {Response} res : responds object
   * @returns : records retrived from the database
   */
  static async getAllProduct(req, res){
    try {
      const products = await ProductModel.getAllProduct();
      return res.status(200).json({data: products}); 
    } catch (error) {
      return res.status(400).json({
        data: [{
          error : 'Records not found'
        }]
      }); 
    }
  }

  /**
   * addProduct : adds new product details
   * @param {Request} req 
   * @param {Response} res 
   * @returns new product details on success,
   *          error message on failure
   */
  static async addProduct(req, res){
    if (req.headers['content-type'] != "multipart/form-data"){
      return res.status(400).json({data:[
        {
          "error": "Invalid content type"
        }
      ]});
    }
    const imagePath = "./public/images/";
    const imageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const product = {};
    const requiredFields = ["name", "description", "price", "category"];
    let isFileUploaded = false;
    const busyboy = Busyboy({
      headers : req.headers
    });
    busyboy.on('field', (name, val, info) => {
      /**
       * get input fields values
       */
      product[name] = val.toLowerCase();
    }).on('file', (name, file, info) => {
      isFileUploaded = true;
      const { mimeType } = info;
      /**
       * Validate all required fields
       */
      if(!(requiredFields.every(i => Object.keys(product).includes(i)))){
        busyboy.emit('error', "Incomplete fields");
        return
      }

      /**
       * validate reqired field value
        */
      if (Object.values(product).some(ele => !ele)){
        busyboy.emit('error', "Missing values");
        return
      }
  
      /**
       * validate image type
       */
      if(!imageTypes.includes(mimeType)){
        busyboy.emit('error', "Invalid Image");
        return
      }

      const imageName = `${uuidv4()}.${mimeType.split('/')[1]}`;
      const saveTo =`${imagePath}${imageName}`;
      const writeStream = createWriteStream(saveTo);
      file.pipe(writeStream);
      product['image']= imageName;
      
      /**
       * validate file size
       *  max file size is 1MB by default
       */
      let fileSize = 0;
      const maxImageSize = process.env.MAX_IMAGE_SIZE || 1048576;
      file.on('data', (data) => {
        /**
         * get file size
         */
        fileSize += data.length;
        if (fileSize > maxImageSize){ 
          file.pause();
          unlinkSync(saveTo);
          // req.unpipe(busyboy);
          busyboy.emit('error', "Max file size exceeded");
        }
      });
    });
    busyboy.on('error',(error) => {
      //req.unpipe(busyboy);
      return res.status(400).json({data:[
        {
          "error": error
        }
      ]});
    });
    busyboy.on('finish',async () => {
      /**
       * update database and return new product values
       * if product image is added
       */
      try {
        if (!isFileUploaded){
          throw("product image is required");
        }
        const addProduct =  await ProductModel.addProduct(product);
          if(addProduct.affectedRows){
            product["id"] = addProduct.insertId;
            res.status(201).json(product);
          }
      } catch (error) {
        product?.image? (unlinkSync(`${imagePath}${product.image}`)) : "";
        return res.status(400).json({data:[
          {
            "error": error
          }
        ]});
      }
    });
    req.pipe(busyboy);
    return;
  }

  /**
   * updateProduct : updates details of an existing record
   * @param {Request} req 
   * @param {Response} res 
   * @returns success message on success
   *          error message on failure
   */
  static async updateProduct(req, res){ 
    if (req.headers['content-type'] != "multipart/form-data"){
      return res.status(400).json({data:[
        {
          "error": "Invalid content type"
        }
      ]});
    }
    const product = {
      "id": req.params? req.params['id']: null
    };
    const imagePath = "./public/images/";
    const imageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const requiredFields = ["id", "name", "description", "price", "category"];
    let isFileUploaded = false;
    const busyboy = Busyboy({
      headers : req.headers
    });
    busyboy.on('field', (name, val) => {
      /**
       * get input fields values
       */
      product[name] = val.toLowerCase();
    }).on('file', ( name, file, info) => {
      isFileUploaded = true;
      const { mimeType } = info;
      /**
       * Validate all required fields
       */
      if(!(requiredFields.every(i => Object.keys(product).includes(i)))){
        busyboy.emit('error', "Incomplete fields");
        return
      }

      /**
       * validate reqired field value
        */
      if (Object.values(product).some(ele => !ele)){
        busyboy.emit('error', "Missing values");
        return
      }
  
      /**
       * validate image type
       */
      if(!imageTypes.includes(mimeType)){
        busyboy.emit('error', "Invalid Image");
        return
      }

      const imageName = `${uuidv4()}.${mimeType.split('/')[1]}`;
      const saveTo =`${imagePath}${imageName}`;
      const writeStream = createWriteStream(saveTo);
      file.pipe(writeStream);
      product['image']= imageName;
      
      /**
       * validate file size
       *  max file size is 1MB by default
       */
      let fileSize = 0;
      const maxImageSize = process.env.MAX_IMAGE_SIZE || 1048576;
      file.on('data', (data) => {
        /**
         * get file size
         */
        fileSize += data.length;
        if (fileSize > maxImageSize){ 
          file.pause();
          unlinkSync(saveTo);
          // req.unpipe(busyboy);
          busyboy.emit('error', "Max file size exceeded");
        }
      });
    });
    busyboy.on('error',(error) => {
      //req.unpipe(busyboy);
      return res.status(400).json({data:[
        {
          "error": error
        }
      ]}
      );
    });
    busyboy.on('finish',async () => {
      try {
        /**
         * update database and return new product values
         * if product image is added
         */ 
        // if(existsSync(`${imagePath}${product.image}`)){}
        
        if(!isFileUploaded && !requiredFields.every(i => Object.keys(product).includes(i))){
          //check for complete fields
          throw ("Incomplete Field");
        }
        if(!isFileUploaded && Object.values(product).some(ele => !ele)){
          // check for complete values
          throw ("Invalid Value");
        }
        if(!isFileUploaded && 
          requiredFields.every(i => Object.keys(product).includes(i)) && 
          !Object.values(product).some(ele => !ele)){
            /**
             * if new image is not uploaded
             * and all required fields are valid  
             * and all required fiels are not null
             * update the database with the new update
             * 
             */
            const updateProduct = await ProductModel.updateProduct(product);
            if(!updateProduct.affectedRows){
                throw ("unable to update records")
              }else{
                return res.status(201).json({data:[
                  {
                    "msg": "Successful"
                  }
                ]});
              }
        }
        if(isFileUploaded && existsSync(`${imagePath}${product.image}`)){
          /**
           * if a new image is uploaded
           * update database with the new update
           *  
           */
          const updateProduct = await ProductModel.updateProduct(product);
          if(!updateProduct.affectedRows){
            throw ("unable to update records")
          }else{
            return res.status(201).json({data:[
              {
                "msg": "Successful"
              }
            ]});
          }
        }
      } catch (error) {
        return res.status(400).json({data:[
          {
            "error": error
          }
        ]});
      }
    });
    req.pipe(busyboy);
    return;
  }

  /**
   * deleteProduct : delete exisitng product
   * @param {Request} req 
   * @param {Response} res 
   * @returns success message on success
   *          error message on failure
   */
  static async deleteProduct(req, res){
    return res.status(201).json({data:[
      {
        "msg": "Pending TODO"
      }
    ]});
  }

  static async getProductByCategory(req, res){
    const category = req.params["id"];
    try {
      const productByCategory = await ProductModel.getProductByCategory(category);
      return res.status(200).json({data: productByCategory}); 
    } catch (error) {
      return res.status(400).json({
        data: [{
          msg : error
        }]
      })
    }
  }
  static async home(req, res) {
    const redisStatus = "<h1>Web Product Catalogue</h1>";
    res.send(redisStatus);
  }

}
export default ProductController;