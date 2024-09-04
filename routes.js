// Iniciando Route do Express
const express = require('express');
const route = express.Router();

// Iniciando e importando Multer
const multer = require("multer");
const config = require('./src/config/multer');

// Importando os Controllers
const home = require('./src/controllers/home');
const usuario = require('./src/controllers/usuario');
const livro = require('./src/controllers/livros');
const emprestimo = require('./src/controllers/emprestimo');
const favorito = require('./src/controllers/favoritos');


route.get('/', home.pagInicialGet);

// Rotas do usuario (user)
route.post('/login', usuario.verificarUser);
route.post('/registro', usuario.createUser);
route.get('/logout', usuario.logout);
route.post('/updateUser', usuario.updateUser);

// Rotas do livros (ADM)
route.get('/livrosADM', home.isAdmin, home.pagLivrosADMGet);
route.post('/livrosADM', multer(config).single('foto'), livro.createLivro);

// Rotas do Emprestimo (ADM)
route.get('/emprestimosADM', home.isAdmin, home.pagEmprestimosADMGet);
route.post('/emprestimo', multer(config).single('foto'), emprestimo.createEmprestimo);

// Rotas de Favoritos (user)
route.get('/favoritos', home.pagFavoritosGet);
route.post('/favoritos', favorito.createFavoritos);

route.get('/inicio', home.pagInicialGet);
route.get('/livros', home.pagLivrosGet);
route.get('/emprestimos', home.pagEmprestimosGet);
route.get('/usuariosADM', home.isAdmin, home.pagUsuariosADMGet);

module.exports = route;

