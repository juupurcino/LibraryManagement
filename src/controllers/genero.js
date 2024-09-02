const sequelize = require("sequelize");
const db = require("../config/db");
const Generolivro = require("../model/generolivro");

module.exports = {

    async createGeneroLivro(req, res){
        const dados = req.body;

        await Generolivro.create({
            
            IDGenero: dados.genero,
            IDLivro: dados.livro
        });

        res.redirect('/livrosADM');
    }
}