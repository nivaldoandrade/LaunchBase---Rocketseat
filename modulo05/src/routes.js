const express = require('express');
const routes = express.Router();
const instructorsController = require("./app/controllers/instructorsController");
const membersController = require("./app/controllers/membersController");

routes.get("/", (req, res) => {
    return res.redirect("/instructors");
});

routes.get("/instructors", instructorsController.index);
routes.get("/instructors/create", instructorsController.create);
routes.post("/instructors", instructorsController.post);
routes.put("/instructors", instructorsController.put);
routes.get("/instructors/:id", instructorsController.show);
routes.get("/instructors/:id/edit", instructorsController.edit);
routes.delete("/instructors", instructorsController.delete);

routes.get("/members", membersController.index);
routes.get("/members/create", membersController.create);
routes.post("/members", membersController.post);
routes.put("/members", membersController.put);
routes.get("/members/:id", membersController.show);
routes.get("/members/:id/edit", membersController.edit);
routes.delete("/members", membersController.delete);

module.exports = routes;