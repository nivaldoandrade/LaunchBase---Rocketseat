const Category = require("../models/Category");
const Product = require("../models/Product");
const File = require("../models/File");
const LoadProductServices = require('../../services/LoadProductService');

const { unlinkSync } = require('fs');


module.exports = {
    async create(req, res) {
        try {
            const categories = await Category.findAll();
            return res.render("products/create.njk", { categories });
        } catch (error) {
            console.error(error);
        };
    },
    async post(req, res) {
        try {
            const files = req.files.map(file => file);
                // if (index == req.body.image_fetuared) 
                // return {
                //     ...file,
                //     fetuared: true
                // } 
                // else 
                //     return {
                //         ...file,
                //         fetuared: false,
                //     }

            let { category_id, name, description, price, quantity, status } = req.body;

            price = price.replace(/\D/g, "");

            const product_id = await Product.create({
                category_id,
                user_id: req.session.userId,
                name,
                description,
                price,
                quantity,
                status: status || 1
            });

            const filePromise = files.map(file => 
                File.create({
                    name: file.filename,
                    path: file.path,
                    product_id,
                }));
                
            await Promise.all(filePromise);

            return res.redirect(`/products/${product_id}/edit`);

        } catch (error) {
            console.error(error);
        }

    },
    async show(req, res) {
        try {
            const product = await LoadProductServices.load('product', { where: { id: req.params.id} });
            // return res.send(product);
            return res.render("products/show", { product });

        } catch (error) {
            console.error(error);
        };    
    },
    async edit(req, res) {
        try {
            const product = await LoadProductServices.load('product', { where: { id: req.params.id } })

            const categories = await Category.findAll();
            
            return res.render("products/edit.njk", {product, categories});

        } catch (error) {
            console.error(error);
        };      
    },
    async put(req, res) {
        try {
            if(req.body.remove_files) {
                const removedFiles = req.body.remove_files.split(',');
                const index = removedFiles.length - 1;
                removedFiles.splice(index, 1);

                const removedFilePromise = removedFiles.map(file => File.delete(file));
                await Promise.all(removedFilePromise);
            };
            
            if(req.files.length != 0) {
                const oldFiles = await Product.files(req.body.id);
                const totalFiles = oldFiles.length + req.files.length;

                if(totalFiles <= 6) {
                    let newFilePromise = req.files.map(file => File.create({
                        name: file.filename,
                        path: file.path, 
                        product_id: req.body.id
                    }));

                    await Promise.all(newFilePromise, req.body.id);
                }
            }
            // await File.update({product_id: req.body.id, fetuared })

            req.body.price = req.body.price.replace(/\D/g, "");
            
            if(req.body.old_price != req.body.price) {
                const oldProduct = await Product.find(req.body.id);
                req.body.old_price = oldProduct.price;
            }

            await Product.update(req.body.id, {
                category_id: req.body.category_id,
                name: req.body.name,
                description: req.body.description,
                old_price: req.body.old_price,
                price: req.body.price,
                quantity: req.body.quantity,
                status: req.body.status
            });

            return res.redirect(`/products/${req.body.id}`);

        } catch (error) {
            console.error(error);
        }
        
    },
    async delete(req, res) {
        try {
            const files = await Product.files(req.body.id);
            
            await Product.delete(req.body.id);

            files.map(file => {
                try {
                   unlinkSync(file.path)
                } catch (error) {
                    console.error(error);
                }
            })

            return res.redirect("/ads/create");

        } catch (error) {
            console.error(error);
        }
        
    }
}