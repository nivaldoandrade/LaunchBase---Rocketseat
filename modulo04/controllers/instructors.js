const fs = require("fs");
const data = require("../data.json");
const { age, date } = require("../utils");
const Intl = require("intl");


exports.index = (req, res) => {

   const instructors = data.instructors.map((instructor) => {
        return {
            ...instructor,
            services: instructor.services.split(",")
        }
   });

    return res.render("instructors/index", {instructors});
}

exports.create = (req, res) => {
    return res.render("instructors/create");
};

exports.post = (req, res) => {
    const keys = Object.keys(req.body);
    
    for(key of keys) {
        if (req.body[key] == "")
            return res.send(`Preencha os campos vazio.`);
    }
    let {name, avatar_url, birth, gender, services} = req.body;

    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.instructors.length + 1);

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return "Write file error";
    })


    return res.redirect(`/instructors/${id}`);
};

exports.show = (req, res) => {
    const { id } = req.params;
    console.log(id);
    const foundInstructor = data.instructors.find((instructor) => {
        return instructor.id == id;
    });

    if (!foundInstructor) return res.send("Não encontrado");
    const instructor = {
        ...foundInstructor,
        id: Number(foundInstructor.id),
        services: foundInstructor.services.split(","),
        age: age(foundInstructor.birth),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at),
    };
 

    return res.render("instructors/show", {instructor});
};

exports.edit = (req, res) => {
    const { id } = req.params;

    const foundInstructor = data.instructors.find((instructor) => {
        return instructor.id == id 
    });

    if(!foundInstructor) return res.send("Instrutor não encontrado!")

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth).iso,
    }

    return res.render("instructors/edit", {instructor});
}

exports.put = (req, res) => {
    const { id } = req.body;
    const keys = Object.keys(req.body);
    let index = 0;

    for(key of keys) {
        if (req.body[key] == ''){
            return res.send("Preencha todos os campos!!");
        }
    }

    const foundInstructor = data.instructors.find((instructor, foundIndex) => {
        if (instructor.id == id) {
            index = foundIndex;
            return true;
        }
    });

    const instructor = {
        ...foundInstructor,
        ...req.body,
        id: Number(req.body.id),
        birth: Date.parse(req.body.birth),
    }
    
    data.instructors[index] = instructor;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) =>{
        if (err) return "Write file error!"
    });

    return res.redirect(`/instructors/${id}`);
};
 
exports.delete = (req, res) => {
    const { id } = req.body;

    const foundInstructor = data.instructors.filter((instructor) => {
        return instructor.id != id;
    });

    data.instructors = foundInstructor;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return "Write file error!";
    });

    return res.redirect("/instructors");
};