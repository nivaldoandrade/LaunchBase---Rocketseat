const fs = require("fs");
const data = require("../data.json");
const { date } = require("../utils");
const Intl = require("intl");


exports.index = (req, res) => {

   const members = data.members.map((member) => {
        return {
            ...member,
        }
   });

    return res.render("members/index", {members});
}

exports.create = (req, res) => {
    return res.render("members/create");
};

exports.post = (req, res) => {
    const keys = Object.keys(req.body);
    
    for(key of keys) {
        if (req.body[key] == "")
            return res.send(`Preencha os campos vazio.`);
    }
    let {
        name,
        email, 
        avatar_url, 
        birth, 
        gender,
        blood,
        weight,
        height,    
    } = req.body;

    birth = Date.parse(birth);

    let id = 1;
    const lastMember = data.members[data.members.length - 1];

    if (lastMember) {
        id = lastMember.id + 1;
    };

    data.members.push({
        id,
        avatar_url,
        name,
        email,
        birth,
        gender,
        blood,
        weight,
        height,
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return "Write file error";
    })


    return res.redirect(`/members/${id}`);
};

exports.show = (req, res) => {
    const { id } = req.params;

    const foundMember = data.members.find((member) => {
        return member.id == id;
    });

    if (!foundMember) return res.send("Não encontrado");
    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay,
    };
 

    return res.render("members/show", {member});
};

exports.edit = (req, res) => {
    const { id } = req.params;

    const foundMember = data.members.find((member) => {
        return member.id == id 
    });

    if(!foundMember) return res.send("Instrutor não encontrado!")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso,
    }

    return res.render("members/edit", {member});
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

    const foundMember = data.members.find((member, foundIndex) => {
        if (member.id == id) {
            index = foundIndex;
            return true;
        }
    });

    const member = {
        ...foundMember,
        ...req.body,
        id: Number(req.body.id),
        birth: Date.parse(req.body.birth),
    }
    console.log(index);
    data.members[index] = member;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) =>{
        if (err) return "Write file error!"
    });

    return res.redirect(`/members/${id}`);
};

exports.delete = (req, res) => {
    const { id } = req.body;

    const foundMember = data.members.filter((member) => {
        return member.id != id;
    });

    data.members = foundMember;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return "Write file error!";
    });

    return res.redirect("/members");
};