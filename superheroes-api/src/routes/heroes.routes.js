const express = require("express");
const routes = express.Router();
const heroesController = require("../controllers/heroes.controller.js");


routes.get("/", heroesController.list);
routes.post("/", heroesController.create);
routes.put("/", heroesController.update);
routes.patch("/", heroesController.patch);
routes.delete("/", heroesController.deleteHero);
module.exports = routes;

