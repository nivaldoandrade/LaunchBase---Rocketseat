const express = require('express');;
const routes = express.Router();

const multer = require('../app/middlewares/multer');

const ProductsController = require("../app/controllers/ProductsController");
const SearchController = require("../app/controllers/SearchController");

const { onlyUsers } = require('../app/middlewares/session');
const productValidator = require('../app/validators/product');

// SEARCH
routes.get("/search", SearchController.index);

// PRODUCTS
routes.get("/create", onlyUsers, ProductsController.create);
routes.get("/:id", ProductsController.show);
routes.get("/:id/edit", onlyUsers, ProductsController.edit);
routes.post("/", onlyUsers, multer.array('photos', 6), productValidator.post, ProductsController.post);
routes.put("/", onlyUsers, multer.array('photos', 6), productValidator.post, ProductsController.put);
routes.delete("/", ProductsController.delete);

module.exports = routes;
