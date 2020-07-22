const db = require('../../config/db');
const { hash } = require('bcryptjs');
const fs = require('fs');
const Product = require('./Product');

module.exports = {
    async findOne(filters) {
        let query = "SELECT * FROM users"

        Object.keys(filters).map(key => {
            query = `${query} ${key}`;

            Object.keys(filters[key]).map(field => {
                query = `${query} ${field} = '${filters[key][field]}'`
            });
        });

        const result = await db.query(query);

        return result.rows[0];
    },
    async create(data) {
        const query = `
            INSERT INTO users (
                name,
                email,
                password,
                cpf_cnpj,
                cep,
                address
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `
        const passwordHash = await hash(data.password, 8);

        const values = [
            data.name,
            data.email,
            passwordHash,
            data.cpf_cnpj.replace(/\D/g, ""),
            data.cep.replace(/\D/g, ""),
            data.address,
        ]

        const result = await db.query(query, values);

        return result.rows[0].id;
    },
    async update(id, data) {
        let query = "UPDATE users SET"

        Object.keys(data).map((key, index, array) => {
            if((index + 1) < array.length) {
                query = `${query}
                    ${key} = '${data[key]}',
                `
          } else {
                    query = `${query}
                    ${key} = '${data[key]}'
                    WHERE id = ${id}
                `
          }
        });

        await db.query(query);
        return;
    },
    async delete(id) {
            try {
            let results = await db.query("SELECT * FROM products WHERE user_id = $1", [id]);
            const products = results.rows;

            const allFilesPromise = products.map(product => 
                Product.files(product.id)
            );

            let promiseResults = await Promise.all(allFilesPromise);

            await db.query("DELETE FROM users WHERE id = $1", [id]);

            results = promiseResults.map(result => {
                result.rows.map(file => 
                    fs.unlinkSync(file.path));
            });

        } catch (error) {
            console.error(error);
            error: 'Erro inesperado.'
        }
        

    }
}