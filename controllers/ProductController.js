
class ProductController {

    static async home(req, res) {
        const redisStatus = "<h1>Web Product Catalogue</h1>";
        res.send(redisStatus);
      }
}


export default ProductController;