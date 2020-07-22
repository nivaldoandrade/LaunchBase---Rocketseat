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
    // async update(product_id, data) {
    //     const filesProduct = await db.query("SELECT * FROM files WHERE product_id = $1", [id]);
    //     console.log(filesProduct);
    //     let query = "UPDATE set files"

    //     Object.keys(data).map((key, index, array) => {
    //         query = `${query}
    //         ${key} = "${data[key]}"
    //         WHERE id = ${product_id}
    //         `;
    //     })

    //     console.log(query);
    //     await db.query(query);
    //     return;
    // },
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