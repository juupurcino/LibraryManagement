const Usuario = require("../model/usuario");
const Genero = require("../model/genero");
const Livro = require("../model/livro");
const Favorito = require("../model/favorito");
const Emprestimo = require("../model/emprestimo");
const Generolivro = require("../model/generolivro");
const db = require("../config/db");

module.exports = {
   
    async pagIndexGet(req, res){
        res.render('../views/index');
    },

    async pagInicialGet(req, res){
        res.render('../views/inicio');
    },
    
    async pagLivrosGet(req, res){

        res.render('../views/livros');
    },

    async pagFavoritosGet(req, res){
        res.render('../views/favoritos');
    },
    
    async pagEmprestimosGet(req, res){
        res.render('../views/emprestimos');
    },

    async pagUsuariosADMGet(req, res){
        res.render('../views/usuariosADM');
    },

    async pagEmprestimosADMGet(req, res){
        res.render('../views/emprestimosADM');
    },

    async pagLivrosADMGet(req, res){
        res.render('../views/livrosADM');
    }
}