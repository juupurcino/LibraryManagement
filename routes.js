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


// Rotas do usuario
route.post('/login', usuario.verificarUser);
route.post('/registro', usuario.createUser);
route.get('/logout', usuario.logout);

// Rotas do livrosADM
route.post('/livrosADM', multer(config).single('foto'), livro.createLivro);
route.post('/livrosADM', livro.createLivro)

// Rotas do Emprestimo ADM
route.get('/emprestimosADM', home.isAdmin, home.pagEmprestimosADMGet);
route.post('/emprestimo', emprestimo.createEmprestimo);


route.get('/', home.pagInicialGet);
route.get('/inicio', home.pagInicialGet);
route.get('/livros', home.pagLivrosGet);
route.get('/favoritos', home.pagFavoritosGet);
route.get('/emprestimos', home.pagEmprestimosGet);
route.get('/livrosADM', home.isAdmin, home.pagLivrosADMGet);
route.get('/usuariosADM', home.isAdmin, home.pagUsuariosADMGet);

module.exports = route;

