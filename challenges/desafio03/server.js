const express = require('express');
const nunjucks = require('nunjucks');
const courses = require('./data');

const app = express();

app.set("view engine", "njk");
app.use(express.static("public"));

nunjucks.configure("views", {
    express: app,
    autoescape: false,
    noCache: true
});

app.get("/about",(req, res) => {
    const data = {
        avatar_url: "https://avatars0.githubusercontent.com/u/28929274?s=200&v=4",
        name: "Rocketseat",
        description: "Plataforma de educação em tecnologia 🚀",
        techs: ["React.js", "React Native" , "Node.js"],
        links: [
            {link_url: "https://github.com/Rocketseat", name: "Github"},
            {link_url: "https://www.instagram.com/rocketseat_oficial", name: "Instagram"},
            {link_url: "https://www.facebook.com/rocketseat/", name: "Facebook"}
        ]
    }

    return res.render("about", {about: data});
});

app.get("/",(req, res) => {
    res.render("courses", {courses});
});

app.get("/courses/:id", (req, res) => {
    const id = req.params.id;

    const course = courses.find((course) => {
        return course.id == id;
    });

    if(!course) {
       return res.status(404).render("not-found");
    }
    
    res.render("course-page", {course});
});

app.use((req, res) => {
    res.status(404).render("not-found");
});

app.listen("5000",() => {
    return console.log('Server running...')
});