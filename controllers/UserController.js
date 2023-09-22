/**
 * User Controller 
 * 
 */

import EmailUtil from "../util/emailUtil.js";

class UserController{

    /**
     * login : controller for POST /login endpoint for authenticating user
     * @param {Request} req - request object
     * @param {Response} res - response object
     */

    static async login(req, res){
        res.send(req.body.name);
    }

    /**
     * registerUser : controller for POST /register endpoint for registering new user
     * @param {Request} req - request object
     * @param {Response} res - response object
     */

    static async registerUser(req, res){
        /**
         * Users email and password are required for registration
         * 
         * Return status(400),if:
         *      req body doesnt have email and password
         *      the email is not valid 
         *      the email already exist
         * 
         */
        const email = req.body ? req.body.email : null;
        const password = req.body ? req.body.password : null;

        if (!email || !password){
            res.status(400).json({error : 'Invalid Credentials'});
        }

        const isEmailValid = await EmailUtil.validateEmail(email);

        res.status(201).json( {data: isEmailValid });
    }


}

export default UserController;