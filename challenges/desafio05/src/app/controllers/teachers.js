const Intl = require("intl");
const { age, date, servicesSplit } = require("../../lib/utils");
const Teacher = require("../models/Teacher");

module.exports = {
    index(req, res){
        let { filter, page, limit } = req.query;

        page = page || 1;
        limit = limit || 2;
        let offset = limit * (page - 1);

        const params = {
            filter,
            limit,
            offset,
            callback(results) {
                const teachers = results.map((teacher) => {
                    return {
                        ...teacher,
                        subjects_taught: teacher.subjects_taught.split(","),
                    }
                });

                const pagination = {
                    page,
                    total: Math.ceil(results[0].total / 2),
                    
                }

                return res.render("teachers/index", {teachers, filter, pagination});
            },
        };

        Teacher.paginate(params);

    },
    create(req, res){

        return res.render("teachers/create");
    },
    post(req, res){
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "") return res.send("Preencha todos os campos.");
        };

        const dataTeacher = {
            ...req.body,
            subjects_taught: servicesSplit(req.body.subjects_taught),
        }

        Teacher.create(dataTeacher, (teacher) => {
            return res.redirect(`/teachers/${teacher.id}`);
        });
    
    },
    show(req, res){
        Teacher.find(req.params.id, (results) => {
            const teacher =  {
                    ...results,
                    birth_date: age(results.birth_date),
                    subjects_taught: results.subjects_taught.split(","),
                    created_at: new Intl.DateTimeFormat("pt-BR").format(results.created_at),
                }

            return res.render("teachers/show", {teacher});
        });
    },
    edit(req, res){
        Teacher.find(req.params.id, (results) => {
            const teacher = {
                ...results,
                birth_date: date(results.birth_date).iso,
            }
            return res.render("teachers/edit", {teacher})
        });
    },
    put(req, res){
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "") return res.send("Preencha todos os campos.");
        }; 

        const dataTeacher = {
            ...req.body,
            subjects_taught: servicesSplit(req.body.subjects_taught),
        }

        Teacher.update(dataTeacher, () => {
            return res.redirect(`teachers/${req.body.id}`);
        })        
    },
    delete(req, res){

        Teacher.delete(req.body.id, () => {
    
            return res.redirect(`/teachers`);
        }) 
    },
};





