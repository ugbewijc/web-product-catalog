/**
 *  User Model Class
 */

import runQuery from "./db.js";

export default class UserModel{
    constructor(){}
    
    static async getUser(email){
        try {
            const sqlStatement = "SELECT * FROM users WHERE email = ?";
            const values =[email];
            return (await runQuery(sqlStatement, values));    
        } catch (error) {
            throw "could not fetch record";
        }
        
    }

    static async addUser(email, password){
        try {
            const sqlStatement = "INSERT INTO users SET ?";
            const values = {email, password};
            return (await runQuery(sqlStatement, values));            
        } catch (error) {
            throw "could not update record";
        }

    }
}