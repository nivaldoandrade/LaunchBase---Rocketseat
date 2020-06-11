const data = require("../data.json");
const fs = require("fs");
const Intl = require("intl");
const { age, servicesSplit, date } = require("../utils");

// INDEX
exports.index = (req, res) => {

    const teachers = data.teachers.map( teacher => {
        return {
            ...teacher,
            services: teacher.services.split(","),
        }
    });

    res.render("teachers/index", {teachers})
};

// CREATE
exports.create = (req, res) => {
    return res.render("teachers/create");
};

// POST
exports.post = (req, res) =>{
    const keys = Object.keys(req.body);

    for(key of keys) {
        if(req.body[key] == "") return res.send("Preencha todos os campos.");
    }; 

    let {avatar_url, name, birth, level, type_of_class, services} = req.body;

    birth = Date.parse(birth);
    const created_at = Date.now();

    let id = 1;
    const lastTeacher = data.teachers[data.teachers.length - 1];

    if (lastTeacher) {
        id = lastTeacher.id + 1;
    }

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        level,
        type_of_class,
        services: servicesSplit(services),
        created_at,
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) =>{
        if(err) return res.send("Erro ao gravar os dados.");
    });

    res.redirect(`/teachers`); 
};

// SHOW
exports.show = (req, res) => {
    const { id } = req.params;

    const foundTeacher = data.teachers.find((teacher) =>{
        return teacher.id == id;
    });

    if(!foundTeacher) return res.send("Professor não encontrado!!");

    const teacher = {
        ...foundTeacher,
        birth: age(foundTeacher.birth),
        services: foundTeacher.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
    }

    return res.render("teachers/show", {teacher});
};

// EDIT
exports.edit = (req, res) =>{
    const { id } = req.params;

    const foundTeacher = data.teachers.find((teacher) => {
        return teacher.id == id;
    });

    if (!foundTeacher) return res.send("Deu ruim");

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso,
    }

    return res.render("teachers/edit", {teacher});  
};

// PUT
exports.put = (req, res) => {
    const { id } = req.body;
    let index = 0

    const foundTeacher = data.teachers.find((teacher, foundIndex) => {
        if (teacher.id == id) {
            index = foundIndex;
            return true;
        }
    });

    console.log(foundTeacher);

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
    }

    data.teachers[index] = teacher;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return "White file error!!";
    });

    return res.redirect(`teachers/${id}`);
};

// DELETE
exports.delete = (req, res) => {
    const { id } = req.body;

    const filterTeachers = data.teachers.filter((teacher) => {
        return teacher.id != id;
    });

    data.teachers = filterTeachers;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return "Write file error!!"
    });

    return res.redirect(`/teachers`);
};

