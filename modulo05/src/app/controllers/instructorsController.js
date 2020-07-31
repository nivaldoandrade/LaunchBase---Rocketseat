const { age, date } = require("../../lib/utils");
const Instructor = require("../models/Instructor");

module.exports = {
    async index(req, res){
        let { filter, page, limit} = req.query;

        page = page || 1;
        limit = limit || 2;
        let offset = limit * (page - 1);

        const params = {
            filter,
            page,
            limit,
            offset,
        };

        const results = await Instructor.paginate(params);
        const instructors = results.map(instructor => ({
            ...instructor,
            services: instructor.services.split(','),
        }));

        const pagination = {
            page,
            total: Math.ceil(results[0].total / limit),
        }

        return res.render("instructors/index", {instructors, pagination, filter})         
    },
    create(req, res){
        return res.render("instructors/create");
    },
    async post(req, res){
        try {
            const keys = Object.keys(req.body);
    
        for(key of keys) {
            if (req.body[key] == "")
                return res.send(`Preencha os campos vazio.`);
        }

        let { name, avatar_url, birth, gender, services } = req.body;

        birth = date(birth).iso;

        const instructorId = await Instructor.create({
            name,
            avatar_url,
            birth,
            gender,
            services
        })

        return res.render('instructors/successCreateEdit');
        } catch (error) {
            console.error(error);
            return res.render('instructors/errorCreateEdit');

        }
    },
    async show(req, res){
        let instructor = await Instructor.find(req.params.id); 

        if(!instructor) {
            return res.send('Instructor not found!');
        };

        instructor.age = age(instructor.birth);
        instructor.services = instructor.services.split(",");
        instructor.created_at = date(instructor.created_at).format;

        return res.render("instructors/show", {instructor})

    },
    async edit(req, res){
        let instructor = await Instructor.find(req.params.id)
        
        if(!instructor) return res.send('Instructor not found!');

        instructor.birth = date(instructor.birth).iso;

        return res.render("instructors/edit", {instructor})
    },
    async put(req, res){
        try {
            const keys = Object.keys(req.body);
    
            for(key of keys) {
                if (req.body[key] == "")
                    return res.send(`Preencha os campos vazio.`);
            }
            
            await Instructor.update(req.body.id, {
                name: req.body.name,
                avatar_url: req.body.avatar_url,
                birth: date(req.body.birth).iso,
                gender: req.body.gender,
                services: req.body.services,
            });

            return res.render('instructors/successCreateEdit');
        } catch (error) {
            console.error(error);
            return res.render('instructors/errorCreateEdit');
        }
    },
    async delete(req, res){
        try {
            await Instructor.delete(req.body.id);

            return res.redirect("instructors");
        } catch (error) {
            console.error(error);
        }
        
    },
}
