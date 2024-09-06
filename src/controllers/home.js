const Usuario = require("../model/usuario");
const Livro = require("../model/livro");
const Favorito = require("../model/favorito");
const Emprestimo = require("../model/emprestimo");
const Genero = require("../model/genero");
const GeneroLivro = require("../model/generoLivro");


module.exports = {
    async pagInicialGet(req, res) {
        if (req.session.IDUsuario) {
            const user = await Usuario.findOne({
                where: { IDUsuario: req.session.IDUsuario },
                raw: true
            });

            const livrosDestaque = await Livro.findAll({
                where: { Destaque: "1" },
                raw: true
            });

            const favoritos = await Favorito.findAll({
                attributes: ['IDLivro', 'IDUsuario'],
                where: { IDUsuario: req.session.IDUsuario },
                raw: true
            });

            return res.render("../views/inicio", { user: user, livrosDestaque: livrosDestaque, favoritos : favoritos });
        }
        res.render("../views/index");
    },

    async pagLivrosGet(req, res) {
        if (req.session.IDUsuario) {
            const user = await Usuario.findOne({
                where: { IDUsuario: req.session.IDUsuario },
                raw: true
            });

            const livros = await Livro.findAll({
                attributes: ['IDLivro', 'Foto'],
                raw: true
            });

            const favoritos = await Favorito.findAll({
                attributes: ['IDLivro'],
                where: { IDUsuario: req.session.IDUsuario },
                raw: true
            });

            return res.render("../views/livros", { user: user, livros: livros, favoritos : favoritos });
        }

        res.render("../views/index");
    },

    async pagFavoritosGet(req, res) {
        if (req.session.IDUsuario) {
            const user = await Usuario.findOne({
                where: { IDUsuario: req.session.IDUsuario },
                raw: true
            });
        
            const livros = await Livro.findAll({
                attributes: ['IDLivro', 'Foto'],
                raw: true
            });

            const favoritos = await Favorito.findAll({
                where: { IDUsuario : user.IDUsuario },
                include: [{
                    model: Livro,
                    attributes: ['Foto']
                }]
            })

            return res.render("../views/favoritos", { user: user, favoritos : favoritos, livros : livros });
        }
        res.render("../views/index");
    },

    async pagEmprestimosGet(req, res) {
        if (req.session.IDUsuario) {
            const user = await Usuario.findOne({
                where: { IDUsuario: req.session.IDUsuario },
                raw: true
            });

            const emprestimo = await Emprestimo.findAll({
                attributes: ['IDLivro', 'DataEmprestimo', 'DataDevolucao'],
                where: { IDUsuario: req.session.IDUsuario },
                include: [{
                        model: Livro,
                        attributes: ['Titulo', 'Foto']
                    }]
            });

            return res.render("../views/emprestimos", { user: user, emprestimos : emprestimo });
        }
        res.render("../views/index");
    },

    async pagUsuariosADMGet(req, res) {
        const usuarios = await Usuario.findAll({
            attributes: ['IDUsuario', 'Nome', 'CPF', 'Telefone', 'Email', 'Genero', 'DataNascimento', 'Admin', 'Ativo'],
            raw: true
        })

        res.render('../views/usuariosADM', { usuarios : usuarios });
    },

    async pagEmprestimosADMGet(req, res) {

       const emprestimos = await Emprestimo.findAll({
            attributes: ['IDEmprestimo', 'IDUsuario', 'IDLivro', 'DataEmprestimo', 'DataDevolucao', 'Multa', 'Devolvido'],
            include: [
                {
                    model: Usuario,
                    attributes: ['CPF']
                },
                {
                    model: Livro,
                    attributes: ['Titulo', 'Foto', 'ISBN']
                }
            ]
        });
        
        res.render('../views/emprestimosADM', { emprestimos: emprestimos });
        
    },
    
    async pagLivrosADMGet(req, res){

        const livro = await Livro.findAll({
            attributes: ['IDLivro', 'ISBN', 'Titulo', 'Autor', 'Ano', 'Descricao', 'Foto', 'Disponibilidade', 'Qtd_emprestimo'],
            raw: true 
        });

        const genero = await Genero.findAll({
            attributes: ['IDGenero', 'Tipo'],
            raw: true 
        });

        const genero_livro = await GeneroLivro.findAll({
            attributes: ['IDGeneroLivro', 'IDGenero', 'IDLivro'],
            include: [{
                model: Genero,
                attributes: ['Tipo']
            }]
        });

        res.render('../views/livrosADM', { genero : genero, livro : livro, genero_livro : genero_livro});

    },

    async isAdmin(req, res, next) {
    if (req.session.isLoggedIn && req.session.Admin === 1) {
        next();
    } else {
        if (req.session.isLoggedIn) {
            return res.redirect("/inicio");
        }
        res.redirect("/");
    }
}
}

