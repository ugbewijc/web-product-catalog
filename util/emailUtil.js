/**
 * 
 */

class EmailUtil {

    static async validateEmail(email){
        /**
         * email regex (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
         */
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

}

export default EmailUtil