const Usuario = require("../model/usuario");
const Livro = require("../model/livro");
const Favorito = require("../model/favorito");
const Emprestimo = require("../model/emprestimo");
const Genero = require("../model/genero");
const GeneroLivro = require("../model/generoLivro");
const { Op, fn, col } = require('sequelize');
const { Sequelize } = require('sequelize');

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

            const dados = req.query;
            const item = dados.pesquisa;
            
            let livroPesquisado;

            if (item) {
                console.log("Item:", item); // Adicione um log para verificar o valor de item
                
                livroPesquisado = await GeneroLivro.findAll({
                    attributes: [
                        [fn('DISTINCT', col('GeneroLivro.IDLivro')), 'IDLivro'],
                        [col('Livro.ISBN'), 'ISBN'],
                        [col('Livro.Titulo'), 'Titulo'],
                        [col('Livro.Autor'), 'Autor'],
                        [col('Livro.Ano'), 'Ano'],
                        [col('Livro.Descricao'), 'Descricao'],
                        [col('Livro.Foto'), 'Foto'],
                        [col('Livro.Disponibilidade'), 'Disponibilidade'],
                        [col('Livro.Qtd_emprestimo'), 'Qtd_emprestimo']
                    ],
                    raw: true,
                    include: [
                        {
                            model: Genero,
                            attributes: [],
                        },
                        {
                            model: Livro,
                        }
                    ],
                    where: {
                        [Op.or]: [
                            {'$Livro.Autor$': { [Op.like]: `%${item}%` }},
                            {'$Livro.Titulo$': { [Op.like]: `%${item}%` }},
                            {'$Genero.Tipo$': { [Op.like]: `%${item}%` }}
                        ]
                    },
                });
                
                console.log("Resultado da pesquisa:", livroPesquisado);
            } else {
                livroPesquisado = await Livro.findAll({
                    attributes: ['IDLivro', 'ISBN', 'Titulo', 'Autor', 'Ano', 'Descricao', 'Foto', 'Disponibilidade', 'Qtd_emprestimo'],
                    raw: true
                });
            }
            
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
            
            const user = await Usuario.findOne({
                where: { IDUsuario: req.session.IDUsuario },
                raw: true
            });
            
            const favoritos = await Favorito.findAll({
                attributes: ['IDLivro'],
                where: { IDUsuario: req.session.IDUsuario },
                raw: true
            });
            
            return res.render('../views/livros', { user: user, genero: genero, livros: livroPesquisado, genero_livro: genero_livro, favoritos : favoritos });
        }
        
        res.render("../views/index");
    },

    async pagFavoritosGet(req, res) {
        if (req.session.IDUsuario) {

            const dados = req.query;
            const item = dados.pesquisa;
            
            let livroPesquisado;

            if (item) {
                console.log("Item:", item); // Adicione um log para verificar o valor de item
                
                livroPesquisado = await GeneroLivro.findAll({
                    attributes: [
                        [fn('DISTINCT', col('GeneroLivro.IDLivro')), 'IDLivro'],
                        [col('Livro.ISBN'), 'ISBN'],
                        [col('Livro.Titulo'), 'Titulo'],
                        [col('Livro.Autor'), 'Autor'],
                        [col('Livro.Ano'), 'Ano'],
                        [col('Livro.Descricao'), 'Descricao'],
                        [col('Livro.Foto'), 'Foto'],
                        [col('Livro.Disponibilidade'), 'Disponibilidade'],
                        [col('Livro.Qtd_emprestimo'), 'Qtd_emprestimo']
                    ],
                    raw: true,
                    include: [
                        {
                            model: Genero,
                            attributes: [],
                        },
                        {
                            model: Livro,
                        }
                    ],
                    where: {
                        [Op.or]: [
                            {'$Livro.Autor$': { [Op.like]: `%${item}%` }},
                            {'$Livro.Titulo$': { [Op.like]: `%${item}%` }},
                            {'$Genero.Tipo$': { [Op.like]: `%${item}%` }}
                        ]
                    },
                });
                
                console.log("Resultado da pesquisa:", livroPesquisado);
            } else {
                livroPesquisado = await Livro.findAll({
                    attributes: ['IDLivro', 'ISBN', 'Titulo', 'Autor', 'Ano', 'Descricao', 'Foto', 'Disponibilidade', 'Qtd_emprestimo'],
                    raw: true
                });
            }
            
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
            
            const user = await Usuario.findOne({
                where: { IDUsuario: req.session.IDUsuario },
                raw: true
            });
            
            const favoritos = await Favorito.findAll({
                attributes: ['IDLivro'],
                where: { IDUsuario: req.session.IDUsuario },
                include: [
                    {
                        model: Livro,
                        attributes: ['Titulo', 'Foto']
                    }
                ]
            });
            
            return res.render('../views/favoritos', { user: user, genero: genero, livros: livroPesquisado, genero_livro: genero_livro, favoritos : favoritos });
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
            attributes: ['Nome', 'CPF', 'Telefone', 'Email', 'Genero', 'DataNascimento', 'Admin'],
            raw: true
        })

        res.render('../views/usuariosADM', { usuarios : usuarios });
    },

    async pagEmprestimosADMGet(req, res) {

       const emprestimos = await Emprestimo.findAll({
            attributes: ['IDUsuario', 'IDLivro', 'DataEmprestimo', 'DataDevolucao', 'Multa'],
            include: [
                {
                    model: Usuario,
                    attributes: ['CPF']
                },
                {
                    model: Livro,
                    attributes: ['Titulo', 'Foto']
                }
            ]
        });
        
        res.render('../views/emprestimosADM', { emprestimos: emprestimos });
        
    },
    
    async pagLivrosADMGet(req, res){
        const dados = req.query;
        const item = dados.pesquisa;
    
        let livroPesquisado;
        if (item) {
            console.log("Item:", item); // Adicione um log para verificar o valor de item

            livroPesquisado = await GeneroLivro.findAll({
                attributes: [
                    [fn('DISTINCT', col('GeneroLivro.IDLivro')), 'IDLivro'],
                    [col('Livro.ISBN'), 'ISBN'],
                    [col('Livro.Titulo'), 'Titulo'],
                    [col('Livro.Autor'), 'Autor'],
                    [col('Livro.Ano'), 'Ano'],
                    [col('Livro.Descricao'), 'Descricao'],
                    [col('Livro.Foto'), 'Foto'],
                    [col('Livro.Disponibilidade'), 'Disponibilidade'],
                    [col('Livro.Qtd_emprestimo'), 'Qtd_emprestimo']
                ],
                raw: true,
                include: [
                    {
                        model: Genero,
                        attributes: [],
                    },
                    {
                        model: Livro,
                    }
                ],
                where: {
                    [Op.or]: [
                        {'$Livro.Autor$': { [Op.like]: `%${item}%` }},
                        {'$Livro.Titulo$': { [Op.like]: `%${item}%` }},
                        {'$Genero.Tipo$': { [Op.like]: `%${item}%` }}
                    ]
                },
            });
            
            console.log("Resultado da pesquisa:", livroPesquisado);
        } else {
            livroPesquisado = await Livro.findAll({
                attributes: ['IDLivro', 'ISBN', 'Titulo', 'Autor', 'Ano', 'Descricao', 'Foto', 'Disponibilidade', 'Qtd_emprestimo'],
                raw: true
            });
        }
    
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
        
        return res.render('../views/livrosADM', { genero: genero, livro: livroPesquisado, genero_livro: genero_livro });
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

