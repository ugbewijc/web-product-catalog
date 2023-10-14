/**
 * 
 * User Authentication Class
 * 
 */

import jsonwebtoken from 'jsonwebtoken';

export default class Auth{
    constructor(){}

    /**
     * generateToken: generates JWT
     * @param {String} username: user email
     * @returns generated token
     */
    
    static async generateToken(username){
        try {
            const jwtSecret = process.env.JWT_SECRET_KEY || "app";
            return jsonwebtoken.sign({user: username}, jwtSecret, { expiresIn: '1h' });   
        } catch (error) {
            throw "Unable to grenerate token";
        }
    }

    /**
     * protectedRoute: is a middeware that restricts access to
     *      request with invalid token or no token
     * @param {Request} req 
     * @param {Response} res 
     * @param {} next 
     * @returns 
     */
    static async protectedRoute(req, res, next){
        try {
            const token = req.headers.token;
            if(!token){
                throw "Unauthorize";
            }
            const jwtSecret = process.env.JWT_SECRET_KEY || "app";
            jsonwebtoken.verify(token, jwtSecret, (err, decoded) => {
                if (err){
                    throw "Unauthorize Token";
                }
                req.user = decoded.email;
                next();
              });
        } catch (error) {
            return res.status(400).json({
                error
            });
        }
    }
}