const data = require("../data.json");
const fs = require("fs");
const Intl = require("intl");
const { age, grade, date } = require("../utils");

exports.index = (req, res) => {

    const students = data.students.map( student => {
        return {
            ...student,
            schoolYear: grade(student.schoolYear),
        }
    });

    res.render("students/index", {students})
};

exports.create = (req, res) => {
    return res.render("students/create");
};

exports.post = (req, res) =>{
    const keys = Object.keys(req.body);

    for(key of keys) {
        if(req.body[key] == "") return res.send("Preencha todos os campos.");
    }; 

    let {avatar_url, name, birth, email, schoolYear, workload} = req.body;

    birth = Date.parse(birth);
    const created_at = Date.now();

    let id = 1;
    const lastStudent = data.students[data.students.length - 1];

    if (lastStudent) {
        id = lastStudent.id + 1;
    }

    data.students.push({
        id,
        avatar_url,
        name,
        birth,
        email,
        schoolYear,
        workload,
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) =>{
        if(err) return res.send("Erro ao gravar os dados.");
    });

    res.redirect(`/students`); 
};

exports.show = (req, res) => {
    const { id } = req.params;
    
    const foundStudents = data.students.find((student) =>{
        return student.id == id;
    });

    if(!foundStudents) return res.send("Professor não encontrado!!");

    const student = {
        ...foundStudents,
        birth: date(foundStudents.birth).birthDay,
        schoolYear: grade(foundStudents.schoolYear),
    }

    return res.render("students/show", {student});
};

exports.edit = (req, res) =>{
    const { id } = req.params;

    const foundStudents = data.students.find((student) => {
        return student.id == id;
    });

    if (!foundStudents) return res.send("Deu ruim");

    const student = {
        ...foundStudents,
        birth: date(foundStudents.birth).iso,
    }

    return res.render("students/edit", {student});  
};

exports.put = (req, res) => {
    const { id } = req.body;

    let index = 0

    const foundStudents = data.students.find((student, foundIndex) => {
        if (student.id == id) {
            index = foundIndex;
            return true;
        }
    });

    const student = {
        ...foundStudents,
        ...req.body,
        birth: Date.parse(req.body.birth),
    }

    data.students[index] = student;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return "White file error!!";
    });

    return res.redirect(`students/${id}`);
};

exports.delete = (req, res) => {
    const { id } = req.body;

    const filterTeachers = data.students.filter((student) => {
        return student.id != id;
    });

    data.students = filterTeachers;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return "Write file error!!"
    });

    return res.redirect(`/students`);
};

