const Usuario = require("../model/usuario");
const Livro = require("../model/livro");
const Favorito = require("../model/favorito");
const sequelize = require("sequelize");

module.exports = {
    async createFavoritos(req, res){
        const dados = req.body;

        await Favorito.create({
            IDUsuario: dados.IDUsuario,
            IDLivro: dados.IDLivro
        });

        res.redirect('/');
    }
}