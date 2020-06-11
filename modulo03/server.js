const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const videos = require('./data');

server.use(express.static('public'));
server.set('view engine','njk');

nunjucks.configure('views',{
    express:server,
    autoescape: false,
    noCache: true
});

server.get("/", (req, res) => {
    const about = {
        avatar_url: 'https://skylab.rocketseat.com.br/api/users/avatar/profile-2b37cb96-8d3e-40a3-a7de-cace6297e6e9.jpg" alt="Nivaldo Andrade',
        name: "Nivaldo Andrade",
        role: "Futuro Desenvolvedor Web/Mobile",
        description: 'Entusiasta por desenvolvimento web/mobile e aluno do bootcamp Launchbase da <a href="https://rocketseat.com.br" target="_blank">Rocketseat.</a>',
        links: [ 
            {link_url: "https://www.facebook.com/nivaldo.andrade.5", name: "Github"},
            {link_url: "https://www.instagram.com/nivaldo_andrade", name: "Twitter"},
            {link_url: "https://www.facebook.com/nivaldo.andrade.5", name: "Linkedin"}
        ]
    };

    return res.render("about", { about });
});

server.get("/portfolio", (req, res) => {
    return res.render("portfolio", {items: videos});
});

server.get("/video", (req, res) => {
    const id = req.query.id;
    const video = videos.find((video) =>{
        return video.id == id
    });

    if(!video)
        return res.send("Video não encontrado!!");

    res.render("video", {item: video});
});


server.listen(5000, () => {
    console.log('server running...');
});