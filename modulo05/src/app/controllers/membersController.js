const {  date } = require("../../lib/utils");
const Member = require("../models/Member");

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

        const members = await Member.paginate(params);
        const pagination = {
            page,
            total: Math.ceil(members[0].total / limit),
        }

        return res.render("members/index", {members, pagination, filter})
    },
    async create(req, res){
        const instructorOption = await Member.instructorSelectOption();

        return res.render("members/create", {instructorOption});

    },
    async post(req, res){
        try {
            const keys = Object.keys(req.body);

            for(key of keys) {
                if (req.body[key] == "")
                    return res.send(`Preencha os campos vazio.`);
            }

            let { name, avatar_url, email, gender, birth, blood, weight, height, instructor } = req.body;

            birth = date(birth).iso;

            const memberId = await Member.create({
                name,
                avatar_url,
                email,
                gender,
                birth,
                blood,
                weight,
                height,
                instructor_id: instructor
            })

            return res.render('members/successCreateEdit');
        } catch (error) {
            console.error(error);
            return res.render('members/errorCreateEdit');
        }
    },
    async show(req, res){
        let member = await Member.find(req.params.id);

        if(!member) return res.send('Member not found!');

        member.birth = date(member.birth).birthDay;

        return res.render("members/show", {member})

    },
    async edit(req, res){
        let member = await Member.find(req.params.id);

        if(!member) return res.send('Member not found!');

        member.birth = date(member.birth).iso;

        const instructorOption = await Member.instructorSelectOption();

        return res.render("members/edit", { member, instructorOption });

    },
    async put(req, res){
        try {
            const keys = Object.keys(req.body);
    
            for(key of keys) {
                if (req.body[key] == "")
                    return res.send(`Preencha os campos vazio.`);
            }
            
            await Member.update(req.body.id, {
                name: req.body.name,
                avatar_url: req.body.avatar_url,
                email: req.body.email,
                gender: req.body.gender,
                birth: date(req.body.birth).iso,
                blood: req.body.blood,
                weight: req.body.weight,
                height: req.body.height,
                instructor_id: req.body.instructor,
            });

            return res.render('members/successCreateEdit');
        } catch (error) {
            console.error(error);
            return res.render('members/errorCreateEdit');
        }
    },
    async delete(req, res){
        try {
            await Member.delete(req.body.id);

            return res.redirect("members");
        } catch (error) {
            console.error(error);
        }
    },
}
