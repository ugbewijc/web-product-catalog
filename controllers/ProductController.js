
class ProductController {

    static async home(req, res) {
        const redisStatus = "running";
        res.send(redisStatus);
      }
}


export default ProductController;