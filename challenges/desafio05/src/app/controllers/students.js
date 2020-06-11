const Intl = require("intl");
const { age, grade, date, servicesSplit } = require("../../lib/utils");
const Student = require("../models/Student");

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
                const students = results.map((student) => {
                    return {
                        ...student,
                        school_year: grade(student.school_year),
                    }
                })

                const pagination = {
                    page,
                    total: Math.ceil(results[0].total / 2),
                    
                }

                return res.render("students/index", {students, filter, pagination});
            },
        };

        Student.paginate(params);
        
    },
    create(req, res){
        Student.teacherSelectOption((options) => {

            return res.render("students/create", { teachersOption: options});
        });

        
    },
    post(req, res){
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "") return res.send("Preencha todos os campos.");
        };

        Student.create(req.body, (student) => {
            return res.redirect(`/students/${student.id}`);
        });
    
    },
    show(req, res){
        Student.find(req.params.id, (results) => {
            const student =  {
                    ...results,
                    birth_date: date(results.birth_date).birthDay,
                    school_year: grade(results.school_year),
                }

            return res.render("students/show", {student});
        });
    },
    edit(req, res){
        Student.find(req.params.id, (results) => {
            const student = {
                ...results,
                birth_date: date(results.birth_date).iso,
            }

            Student.teacherSelectOption((options) => {
                
                return res.render("students/edit", {student, teachersOption: options});
            });     
        });
    },
    put(req, res){
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "") return res.send("Preencha todos os campos.");
        }; 

        Student.update(req.body, () => {
            return res.redirect(`students/${req.body.id}`);
        })        
    },
    delete(req, res){

        Student.delete(req.body.id, () => {
    
            return res.redirect(`/students`);
        }) 
    },
};





