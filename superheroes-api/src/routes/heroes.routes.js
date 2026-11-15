const express = require("express");
const routes = express.Router();
const heroesController = require("../controllers/heroes.controller.js");


routes.get("/", heroesController.list);
routes.post("/", heroesController.create);
routes.put("/:id", heroesController.update);
routes.patch("/:id", heroesController.patch);
routes.delete("/:id", heroesController.deleteHero);
module.exports = routes;

