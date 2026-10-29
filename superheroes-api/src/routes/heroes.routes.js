const express = require("express");
const routes = express.Router();
const heroesController = require("../controllers/heroes.controller.js");


routes.get("/", heroesController.list);

module.exports = routes;

