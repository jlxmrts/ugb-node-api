const express = require("express");
const sequelize = require("./database/database.js");

const app = express();

const Hero = require("./models/Hero.js");
const Movie = require("./models/Movie.js");
const heroesRoutes = require("./routes/heroes.routes.js");



Hero.belongsToMany(Movie,{
    through:"HeroMovies"
});

Movie.belongsToMany(Hero, {
    through:"MoviesHero"
});

app.use("/heroes", heroesRoutes);

sequelize
    .sync()
    .then(() =>{ 
        console.log("Banco de dados sincronizado")
    }) // () =>{ } função  que não vai ter nome0
    .catch((error) =>{ 
        console.error("Erro a sincroizar banco", error)
    })

module.exports = app;