const express = require('express');
const routes = express.Router();
const multer = require('./app/middlewares/multer');

const ProductsControllers = require("../src/app/controllers/productsController");


routes.get("/", (req, res) => {
    return res.render("layout.njk");
});

routes.get("/products/create", ProductsControllers.create);
routes.get("/products/:id/edit", ProductsControllers.edit);
routes.post("/products", multer.array('photos', 6), ProductsControllers.post);
routes.put("/products", multer.array('photos', 6), ProductsControllers.put);
routes.delete("/products", ProductsControllers.delete);


// ALIAS
routes.get("/ads/create", (req, res) => {
    return res.redirect("/products/create");
})

module.exports = routes;