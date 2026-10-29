const Hero = require ("../models/Hero.js");


async function list(req, res){ // realiza a função
    const movies = await Hero.findAll(); //o await é para esperar o processo terminar para depois retornar 
    return res.status(200).json(movies);

}

module.exports = {
    list
};