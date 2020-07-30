const LoadProductService = require('../../services/LoadProductService');



module.exports = {
    async index(req, res) {
        const productsAll = await LoadProductService.load('products');
        const products = productsAll.filter((product, index) =>  index > 2 ? false : true);

        return res.render("home/index", { products })    
    },
}
