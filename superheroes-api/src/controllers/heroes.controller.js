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

async function update (req, res){
    const { id } = req.params;
    const {name, universe, power} = req.body;

    const hero = await Hero.findByPk(id);
    if (!hero){
        return res.status(404).json({
            message:"Heroi nao encontardo"
        });
    }

    await hero.update ({name, universe, power})
    return res.status (200).json(hero);

}

async function patch(req, res) {
    const { id } = req.params;
    const hero = await Hero.findByPk(id);

    if (!hero) {
        return res.status(404).json({
            message: "Heroi nao encontrado"
        });
    }

    await hero.update(req.body);

    return res.status(200).json(hero);
}

async function deleteHero (req, res){
    const { id } = req.params;
    const hero = await Hero.findByPk(id);

    if (!hero) {
        return res.status(404).json({
            message: "Herói não encontrado"
        });
    }

    await hero.destroy();

    return res.status(200).json({
        message: "Heroi deletado com sucesso"
    });

}

module.exports = {
    list,
    create,
    update,
    deleteHero
};