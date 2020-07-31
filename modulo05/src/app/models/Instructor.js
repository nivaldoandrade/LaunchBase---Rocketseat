const db = require("../..//config/db");
const Base = require('./Base');

Base.init({ table: 'instructors'});

module.exports = {
    ...Base,   
    async find(id){
        const results = await db.query(`SELECT *
        FROM instructors
        WHERE id = $1`, [id])

         return results.rows[0];
    },
    async paginate(params){
        const { filter, limit, offset} =  params;

        let query = '',
            filterQuery = '',
            totalQuery = '(SELECT count(*) FROM instructors) AS total'

        if(filter){
            filterQuery = `WHERE 1=1
            AND (instructors.name ILIKE '%${filter}%' OR instructors.services ILIKE '%${filter}%')`
            totalQuery = `(SELECT count(*) 
            FROM instructors
            ${filterQuery}) AS total`
        } 

        query = `SELECT instructors.*, ${totalQuery}, count(members) AS total_students
        FROM instructors
        LEFT JOIN members ON (instructors.id = members.instructor_id)
        ${filterQuery}
        GROUP BY instructors.id LIMIT $1 OFFSET $2`
    
        const results = await db.query(query, [limit, offset]);
        
        return results.rows;
    },
}
