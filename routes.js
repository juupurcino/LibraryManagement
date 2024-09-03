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
<<<<<<< HEAD
=======

// Rotas do livrosADM
route.post('/livrosADM', multer(config).single('foto'), livro.createLivro);
route.post('/livrosADM', livro.createLivro)
>>>>>>> 947f75bbb12df7764c408d36e56d4ccb0d954e9c

// Rotas do Emprestimo ADM
route.get('/emprestimosADM', home.isAdmin, home.pagEmprestimosADMGet);
route.post('/emprestimo', emprestimo.createEmprestimo);

// Rotas do Livro ADM
route.get('/livrosADM', home.isAdmin, home.pagLivrosADMGet);
route.post('/livrosADM', livro.createLivro)


route.get('/', home.pagInicialGet);
route.get('/inicio', home.pagInicialGet);
route.get('/livros', home.pagLivrosGet);
route.get('/favoritos', home.pagFavoritosGet);
route.get('/emprestimos', home.pagEmprestimosGet);
route.get('/usuariosADM', home.isAdmin, home.pagUsuariosADMGet);

module.exports = route;

