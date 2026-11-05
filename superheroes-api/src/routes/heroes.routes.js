const express = require("express");
const routes = express.Router();
const heroesController = require("../controllers/heroes.controller.js");


routes.get("/", heroesController.list);
routes.post("/", heroesController.create);
module.exports = routes;

