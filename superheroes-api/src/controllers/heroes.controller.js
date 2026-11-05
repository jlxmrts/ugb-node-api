const Hero = require("../models/Hero.js");


async function list(req, res){ // realiza a função
    const movies = await Hero.findAll(); //o await é para esperar o processo terminar para depois retornar 
    return res.status(200).json(movies);

};

async function create (req, res){
    const {name, universe, power} = req.body;

    if (!name || !universe || !power){
        return res.status(400).json({
            message: "Nome, o universo e poder são obrigatórios"
        });
    }
    const hero = await Hero.create({name, universe, power})
    return res.status (201).json(hero);
}


module.exports = {
    list,
    create
};