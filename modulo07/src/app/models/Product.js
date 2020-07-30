const Base = require('./Base');
const db = require('../../config/db');

Base.init({ table: 'products'});

const Product = {
    ...Base,
    async files(id) {
        const results = await db.query(`SELECT * FROM files WHERE product_id = $1`, [id]);
        //ORDER BY fetuared DESC
        return results.rows;
    },
    async search({filter, category}) {

        let query = `
            SELECT products.*, categories.name AS category_name
            FROM products
            LEFT JOIN categories ON (products.category_id = categories.id)
            WHERE 1 = 1
        `
        if(category) {
            query += `
                AND  products.category_id = ${category}
            `
        }

        if(filter) {
            query += `
                AND (products.name ilike '%${filter}%' OR products.description ilike '%${filter}%')
            `
        }

        query += `
            AND status != 0
        `
        const results = await db.query(query);

        return results.rows;
    }
}

module.exports = Product;

