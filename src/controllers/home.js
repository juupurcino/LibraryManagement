const Usuario = require("../model/usuario");
const Livro = require("../model/livro");
const Favorito = require("../model/favorito");
const Emprestimo = require("../model/emprestimo");
const Genero = require("../model/genero");
const GeneroLivro = require("../model/generoLivro");
const { Op, fn, col, where } = require('sequelize');
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
                attributes: ['IDEmprestimo', 'IDLivro', 'DataEmprestimo', 'DataDevolucao'],
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

        const dados = req.query;
        
        const pesquisa = dados.pesquisa;
        const adm = dados.adm;

        let usuarios;

        if(pesquisa && adm){
            if(adm == 'sim'){
                usuarios = await Usuario.findAll({
                    attributes: ['IDUsuario', 'Nome', 'CPF', 'Telefone', 'Email', 'Genero', 'DataNascimento', 'Admin', 'Ativo'],
                    raw: true,
                    where:
                        {[Op.or] : [
                            {'Nome' : {[Op.like]: `%${pesquisa}%`}},
                            {'Email' : {[Op.like]: `%${pesquisa}%`}},
                            {'CPF' : {[Op.like]: `%${pesquisa}%`}},
                            {'Genero' : {[Op.like]: `%${pesquisa}%`}},
                            {'Telefone' : {[Op.like]: `%${pesquisa}%`}}
                        ], 'Admin': 1}
                });
            } else {
                usuarios = await Usuario.findAll({
                    attributes: ['IDUsuario', 'Nome', 'CPF', 'Telefone', 'Email', 'Genero', 'DataNascimento', 'Admin', 'Ativo'],
                    raw: true,
                    where:
                        {[Op.or] : [
                            {'Nome' : {[Op.like]: `%${pesquisa}%`}},
                            {'Email' : {[Op.like]: `%${pesquisa}%`}},
                            {'CPF' : {[Op.like]: `%${pesquisa}%`}},
                            {'Genero' : {[Op.like]: `%${pesquisa}%`}},
                            {'Telefone' : {[Op.like]: `%${pesquisa}%`}}
                        ], 'Admin': 0}
                });
            }
        } else if(pesquisa){
            usuarios = await Usuario.findAll({
                attributes: ['IDUsuario', 'Nome', 'CPF', 'Telefone', 'Email', 'Genero', 'DataNascimento', 'Admin', 'Ativo'],
                raw: true,
                where:
                    {[Op.or] : [
                        {'Nome' : {[Op.like]: `%${pesquisa}%`}},
                        {'Email' : {[Op.like]: `%${pesquisa}%`}},
                        {'CPF' : {[Op.like]: `%${pesquisa}%`}},
                        {'Genero' : {[Op.like]: `%${pesquisa}%`}},
                        {'Telefone' : {[Op.like]: `%${pesquisa}%`}}
                    ]}
            });
        } else if(adm){
            if(adm == 'sim'){
                usuarios = await Usuario.findAll({
                    attributes: ['IDUsuario', 'Nome', 'CPF', 'Telefone', 'Email', 'Genero', 'DataNascimento', 'Admin', 'Ativo'],
                    raw: true,
                    where: {'Admin': 1}
                });
            } else {
                usuarios = await Usuario.findAll({
                    attributes: ['IDUsuario', 'Nome', 'CPF', 'Telefone', 'Email', 'Genero', 'DataNascimento', 'Admin', 'Ativo'],
                    raw: true,
                    where: {'Admin': 0}
                });
            }
        } else {
            usuarios = await Usuario.findAll({
                attributes: ['IDUsuario', 'Nome', 'CPF', 'Telefone', 'Email', 'Genero', 'DataNascimento', 'Admin', 'Ativo'],
                raw: true
            });
        }


        res.render('../views/usuariosADM', { usuarios : usuarios, adm : adm });
    },

    async pagEmprestimosADMGet(req, res) {
        const dados = req.query;

        const item = dados.pesquisa;
        const classificacao = dados.classificacao;

        let emprestimos;

        if(item && classificacao){
            if(classificacao == 'antigos'){
                emprestimos = await Emprestimo.findAll({
                    attributes: ['IDEmprestimo','IDUsuario', 'IDLivro', 'DataEmprestimo', 'DataDevolucao', 'Multa', 'Devolvido'],
                    include: [
                        {
                            model: Usuario,
                            attributes: ['CPF']
                        },
                        {
                            model: Livro,
                            attributes: ['Titulo', 'Foto', 'ISBN']
                        }
                    ],
                    where: {
                        [Op.or]: [
                            {'$Usuario.CPF$': { [Op.like]: `%${item}%` }},
                            {'$Livro.Titulo$': { [Op.like]: `%${item}%` }},
                            {'IDEmprestimo': { [Op.like]: `%${item}%` }}
                        ]
                    },
                    order: [
                        ['DataEmprestimo', 'ASC']
                    ]
                });
            }else{
                emprestimos = await Emprestimo.findAll({
                    attributes: ['IDEmprestimo','IDUsuario', 'IDLivro', 'DataEmprestimo', 'DataDevolucao', 'Multa', 'Devolvido'],
                    include: [
                        {
                            model: Usuario,
                            attributes: ['CPF']
                        },
                        {
                            model: Livro,
                            attributes: ['Titulo', 'Foto', 'ISBN']
                        }
                    ],
                    where: {
                        [Op.or]: [
                            {'$Usuario.CPF$': { [Op.like]: `%${item}%` }},
                            {'$Livro.Titulo$': { [Op.like]: `%${item}%` }},
                            {'IDEmprestimo': { [Op.like]: `%${item}%` }}
                        ]
                    },
                    order: [
                        ['DataEmprestimo', 'DESC']
                    ]
                });
            }
        }else if(item){
            emprestimos = await Emprestimo.findAll({
                attributes: ['IDEmprestimo','IDUsuario', 'IDLivro', 'DataEmprestimo', 'DataDevolucao', 'Multa', 'Devolvido'],
                include: [
                    {
                        model: Usuario,
                        attributes: ['CPF']
                    },
                    {
                        model: Livro,
                        attributes: ['Titulo', 'Foto', 'ISBN']
                    }
                ],
                where: {
                    [Op.or]: [
                        {'$Usuario.CPF$': { [Op.like]: `%${item}%` }},
                        {'$Livro.Titulo$': { [Op.like]: `%${item}%` }},
                        {'IDEmprestimo': { [Op.like]: `%${item}%` }}
                    ]
                },
            });
        }else if(classificacao){
            if(classificacao == 'antigos'){
                emprestimos = await Emprestimo.findAll({
                    attributes: ['IDEmprestimo','IDUsuario', 'IDLivro', 'DataEmprestimo', 'DataDevolucao', 'Multa', 'Devolvido'],
                    include: [
                        {
                            model: Usuario,
                            attributes: ['CPF']
                        },
                        {
                            model: Livro,
                            attributes: ['Titulo', 'Foto', 'ISBN']
                        }
                    ],
                    order: [
                        ['DataEmprestimo', 'ASC']
                    ]
                });
            }else{
                emprestimos = await Emprestimo.findAll({
                    attributes: ['IDEmprestimo','IDUsuario', 'IDLivro', 'DataEmprestimo', 'DataDevolucao', 'Multa', 'Devolvido'],
                    include: [
                        {
                            model: Usuario,
                            attributes: ['CPF']
                        },
                        {
                            model: Livro,
                            attributes: ['Titulo', 'Foto', 'ISBN']
                        }
                    ],
                    order: [
                        ['DataEmprestimo', 'DESC']
                    ]
                });
            }
        } else {
            emprestimos = await Emprestimo.findAll({
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
        }
        
        res.render('../views/emprestimosADM', { emprestimos: emprestimos, classificacao: classificacao });
        
    },
    
    async pagLivrosADMGet(req, res){
        const dados = req.query;
        const item = dados.pesquisa;
        
        const disp = dados.disponibilidade;

        let livroPesquisado;
        if (item && disp) {
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
                    [Op.and]: [
                        {
                            [Op.or]: [
                                { '$Livro.Autor$': { [Op.like]: `%${item}%` }},
                                { '$Livro.Titulo$': { [Op.like]: `%${item}%` }},
                                { '$Genero.Tipo$': { [Op.like]: `%${item}%` }}
                            ]
                        },
                        disp == 'disp' ? { '$Livro.Disponibilidade$': 1 } : { '$Livro.Disponibilidade$': 0 }
                    ]
                },
            });
            
        } else if (disp) {
            livroPesquisado = await Livro.findAll({
                attributes: ['IDLivro', 'ISBN', 'Titulo', 'Autor', 'Ano', 'Descricao', 'Foto', 'Disponibilidade', 'Qtd_emprestimo'],
                raw: true,
                where: {...(disp === 'disp' ? { 'Disponibilidade': 1 } : { 'Disponibilidade': 0 })}
            });
        } else if (item) {
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
        }
        
        else {
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
        
        return res.render('../views/livrosADM', { genero: genero, livro: livroPesquisado, genero_livro: genero_livro, disponibilidade: disp });
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

