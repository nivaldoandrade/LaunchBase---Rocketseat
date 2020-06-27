const { formatPrice, date } = require("../../lib/utils");

const Category = require("../models/Category");
const Product = require("../models/Product");
const File = require("../models/File");

module.exports = {
    create(req, res) {
        Category.all()
        .then((results) => {
            
            return res.render("products/create.njk", {categories: results.rows});
        }).catch((err) => {
            throw new Error(err);
        });
    },
    async post(req, res) {
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == '' && key != 'remove_files') {
                return res.send(`${key} - Preencha todos os campos!!`)
            };
        };

        if(req.files.length == 0) {
            return res.send('Please, send at least one image');
        };

        const files = req.files.map((file, index) => {
            if (index == req.body.image_fetuared) 
            return {
                ...file,
                fetuared: true
            } 
            else 
                return {
                    ...file,
                    fetuared: false,
                }
        });

        let results = await Product.create(req.body);
        const productId = results.rows[0].id;

        const filePromise = files.map(file => File.create({...file, product_id: productId}));
        await Promise.all(filePromise);

        return res.redirect(`/products/${productId}/edit`);
    },
    async show(req, res) {
        let result = await Product.find(req.params.id);
        const product = result.rows[0];

        if(!product) {
            return res.send('Product not found!!');
        }

        const { day, month, hour, minute } = date(product.updated_at);

        product.published =  {
            date: `${day}/${month}`,
            hour: `${hour}:${minute}`
        };
        
        result = await Product.files(product.id);
        let files = result.rows;
        files = files.map(file => ({
            ...files,
            src:`${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
        })); 


        product.price = formatPrice(product.price);
        product.old_price = formatPrice(product.old_price);

        
        return res.render("products/show", {product, files});
    },
    async edit(req, res) {
        let results = await Product.find(req.params.id);
        const product = results.rows[0];

        if(!product) {
            return res.send("Produto não encontrado!!");
        }

        product.old_price = formatPrice(product.old_price)
        product.price = formatPrice(product.price);

        results = await Category.all();
        const categories = results.rows;

        results = await Product.files(product.id);
        let files = results.rows;

        files = files.map(file => ({
            ...file,
            src:`${req.protocol}://${req.headers.host}${file.path.replace('public',"")}`
        }));
        
        return res.render("products/edit.njk", {product, categories, files});
    },
    async put(req, res) {
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == '' && key != 'remove_files' && key != 'photos' && key != 'image_fetuared') {
                return res.send(`${key} - Please, fill all fields`);
            };
        };
        
        if(req.body.remove_files) {
            const removedFiles = req.body.remove_files.split(',');
            const index = removedFiles.length - 1;
            removedFiles.splice(index, 1);

            const removedFilePromise = removedFiles.map(file => File.remove(file));
            await Promise.all(removedFilePromise);
        };

        if(req.files.length != 0) {
            const newFilePromise = req.files.map(file => File.create({...file, product_id: req.body.id}));
            await Promise.all(newFilePromise, req.body.id);
        }

        req.body.price = req.body.price.replace(/\D/g, "");

        const oldProduct = await Product.find(req.body.id);

        if(req.body.price == oldProduct.rows[0].price) {
            req.body.old_price = oldProduct.rows[0].old_price;
        } else {
            req.body.old_price = oldProduct.rows[0].price;
        };

        await Product.update(req.body);

        return res.redirect(`/products/${req.body.id}`);
    },
    async delete(req, res) {
        await Product.delete(req.body.id);

        return res.redirect("/ads/create");
    }
}