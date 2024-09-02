const Usuario = require("../model/usuario");
const Livro = require("../model/livro");
const Favorito = require("../model/favorito");
const Emprestimo = require("../model/emprestimo");
const Generolivro = require("../model/generolivro");
const Genero = require("../model/genero");
const db = require("../config/db");

module.exports = {
    async pagInicialGet(req, res){
        if(req.session.IDUsuario){
            const user = await Usuario.findOne({
                where: { IDUsuario: req.session.IDUsuario },
                raw: true 
            });

            return res.render("../views/inicio", {user : user});
        }
        res.render("../views/index");
    },
    
    async pagLivrosGet(req, res){
        if(req.session.IDUsuario){
            const user = await Usuario.findOne({
                where: { IDUsuario: req.session.IDUsuario },
                raw: true 
            });
            
            return res.render("../views/livros", {user : user});
        }
        res.render("../views/index");
    },

    async pagFavoritosGet(req, res){
        if(req.session.IDUsuario){
            const user = await Usuario.findOne({
                where: { IDUsuario: req.session.IDUsuario },
                raw: true 
            });
            
            return res.render("../views/favoritos", {user : user});
        }
        res.render("../views/index");
    },
    
    async pagEmprestimosGet(req, res){
        if(req.session.IDUsuario){
            const user = await Usuario.findOne({
                where: { IDUsuario: req.session.IDUsuario },
                raw: true 
            });
            
            return res.render("../views/emprestimos", {user : user});
        }
        res.render("../views/index");
    },

    async pagUsuariosADMGet(req, res){
        res.render('../views/usuariosADM');
    },

    async pagEmprestimosADMGet(req, res){

        res.render('../views/emprestimosADM');
    },

    async pagLivrosADMGet(req, res){

        const genero = await Genero.findAll({
            attributes: ['IDGenero', 'Tipo'],
            raw: true 
        });

        res.render('../views/livrosADM', { genero : genero});

    },

    async isAdmin(req, res, next) {
        if (req.session.isLoggedIn && req.session.Admin === 1) {
            next();
        } else {
            if(req.session.isLoggedIn){
                return res.redirect("/inicio");
            }
            res.redirect("/");
        }
    }
}

