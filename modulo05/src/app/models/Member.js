const Base = require('./Base');
const db = require("../../config/db");


Base.init({ table: 'members' });

module.exports = {
    ...Base,
    async find(id){
        const results = await db.query(`
        SELECT members.*, instructors.name AS instructor_name
        FROM members
        LEFT JOIN instructors ON (members.instructor_id = instructors.id)
        WHERE members.id = $1`, [id]);

        return results.rows[0];
    },
    async instructorSelectOption(){
        const results = await db.query(`SELECT name, id FROM instructors`);
        return results.rows;
    },
    async paginate(params){
        const { filter, limit, offset } =  params;

        let query = '',
            filterQuery = '',
            totalQuery = '(SELECT count(*) FROM members) AS total'

        if(filter){
            filterQuery = `WHERE 1=1
            AND (members.name ILIKE '%${filter}%' OR members.email ILIKE '%${filter}%')`
            totalQuery = `(SELECT count(*) 
            FROM members
            ${filterQuery}) AS total`
        } 
        
        query = `SELECT members.*, ${totalQuery}
        FROM members
        ${filterQuery}
        LIMIT $1 OFFSET $2`

        const results = await db.query(query, [limit, offset]);

        return results.rows;
    },
}

