const { unlinkSync } = require('fs');
const { hash } = require('bcryptjs')

const User = require('../models/User');
const Product = require('../models/Product');
const LoadProductsServices = require('../../services/LoadProductService');

const { formatCep, formatCpfCnpj } = require('../../lib/utils'); 

module.exports = {
    registerForm(req, res) {
        return res.render("users/register");
    },
    async show(req, res) {
        try {
            const { user } = req

            user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj);
            user.cep = formatCep(user.cep);

            return res.render("users/index", { user });
        } catch (error) {
            console.error(error);
        }  
    },
    async post(req, res) {
        let { name, email, password, cpf_cnpj, cep, address } = req.body;

        cpf_cnpj = cpf_cnpj.replace(/\D/g, "");
        cep = cep.replace(/\D/g, "");
        password = await hash(password, 8);

        const userId = await User.create({
            name, 
            email, 
            password,
            cpf_cnpj,
            cep,
            address
        });

        req.session.userId = userId;
       
        return res.redirect('/users');
    },
    async update(req, res) {
        try {
            const { user } = req;
            let { name, email, cpf_cnpj, cep, address } = req.body;

            cpf_cnpj = cpf_cnpj.replace(/\D/g, "");
            cep = cep.replace(/\D/g, "");

            await User.update(user.id, {
                name,
                email,
                cpf_cnpj,
                cep,
                address,
            });

            res.render('users/index', {
                user: req.body,
                success: 'Atualizado com sucesso!!'
            })
            
        } catch (error) {
            console.error(error);
            return {
                error: 'Ooooops, deu erro!!'
            }
        }

    },
    async delete(req, res) {
        try {
            const products = await Product.findAll({ where: { user_id: req.body.id } })

            const allFilesPromise = products.map(product => 
                Product.files(product.id)
            );
            
            const promiseResults = await Promise.all(allFilesPromise);

            await User.delete(req.body.id);

            req.session.destroy();

            if(promiseResults) {
                promiseResults.map(result => {
                    result.map(file => 
                        unlinkSync(file.path));
                });
            }
            return res.render("home/index",{
                success: 'Usuário deletado com sucesso.'
        })
        } catch (error) {
            console.error(error);
        }
        
    },
    async ads(req, res) {
        const products = await LoadProductsServices.load('products', {
            where: { user_id: req.session.userId }
        })

        return res.render("users/ads", { products });
    }
};