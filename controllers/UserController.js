/**
 * User Controller 
 * 
 */

import Auth from "../middleware/auth.js";
import { hashSync,compare, hash } from "bcrypt";
import EmailUtil from "../util/emailUtil.js";
import UserModel from "../models/UserModel.js";

class UserController{

    /**
     * login : controller for POST /login endpoint for authenticating user
     * @param {Request} req - request object
     * @param {Response} res - response object
     * returns authentication token
     */

    static async login(req, res){
        try {
            const username = req.body ? req.body.username.toLowerCase() : null;
            const password = req.body ? req.body.password : null;

            if (!username || !password){
                throw "Invalid Credentials";
            }
            /**
             * check if the email is valid
             */
            const isEmailValid = await EmailUtil.validateEmail(username);
            if (!isEmailValid){
                throw "Invalid Credentials";
            }
            /**
             * check if the user exist
             */
            const user = await UserModel.getUser(username);
            /**
             * throw "Invalid Credentials", if:
             *       the user does not exist or the password mismatch
             */
            if(!user[0]?.email){
                throw "Invalid Credentials";
            }
            const passwordMatch = await compare(password, user[0].password);
            if (!passwordMatch){
                throw "Invalid Credentials";
            }
            const token = await Auth.generateToken(user[0]?.email);
            return res.status(200).json({data:[{
                token
            }]});
        } catch (error) {
            return res.status(400).json({
                error
            });
        }
    }

    /**
     * registerUser : controller for POST /register endpoint to register new user
     * @param {Request} req - request object
     * @param {Response} res - response object
     * returns authentication token 
     */

    static async registerUser(req, res){
        /**
         * Users email and password are required for registration
         * Return status(201) with new generated token
         * Return status(400),if:
         *      req body doesnt have email and password
         *      the email is not valid 
         *      the email already exist
         * 
         */
        try {
            const saltRounds = process.env.SALT_ROUNDS || 10;
            const username = req.body ? req.body.username.toLowerCase() : null;
            const password = req.body ? req.body.password : null;

            if (!username || !password){
                throw "Invalid Credentials";
            }
            /**
             * check if the email is valid
             */
            const isEmailValid = await EmailUtil.validateEmail(username);
            if (!isEmailValid){
                throw "Invalid Credentials";
            }
            /**
             * check if the user exist
             */
            const user = await UserModel.getUser(username);
            if(user[0]?.email){
                throw "User already exist";
            }
            /**
             * hash password
             */
            // hash(password, Number(saltRounds), (err, hash) =>{
            //     if (err){
            //         // throw "unable to hash";
            //     }
            // });
            const hashPwd = hashSync(password, Number(saltRounds));
            /**
             * add user details to DB
             */
            const addUser = await UserModel.addUser(username, hashPwd);
            /**
             * generate JWT token
             */
            const token = await Auth.generateToken(username);
            /**
             * return token
             */
            return res.status(201).json({data:[{
                token
            }]});   
        } catch (error) {
            return res.status(400).json({
                error
            });
        }
    }
}
export default UserController;