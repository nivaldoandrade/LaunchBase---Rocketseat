const db = require('../../config/db');
const fs = require('fs');

module.exports = {
    create({filename, path, product_id, fetuared}) {
        const query = `
            INSERT INTO files (
                name,
                path,
                product_id,
                fetuared
            ) VALUES ($1, $2, $3, $4)
            RETURNING id
        `; 

        values = [
            filename,
            path,
            product_id,
            fetuared,
        ];

        return db.query(query, values);
    },
    async remove(id) {
        try {
            const result = await db.query(`SELECT * FROM FILES WHERE id = $1`, [id]);
            const file = result.rows[0];

            fs.unlinkSync(file.path);

            return db.query(`DELETE FROM files WHERE id = $1`, [id]);
        } catch(err) {
            if(err) {
                console.log(err);
            }
        };
    }
};