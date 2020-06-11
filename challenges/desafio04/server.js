const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const methodOverride = require("method-override");

const app = express();

app.set('view engine','njk');

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(methodOverride("_method"));
app.use(routes);



nunjucks.configure("views", {
    express: app,
    autoescape: false,
    noCache: true
})

app.listen("5000", () => {
    console.log('server running...');
});