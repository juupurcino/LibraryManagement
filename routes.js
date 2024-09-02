// Iniciando Route do Express
const express = require('express');
const route = express.Router();

// Importando os Controllers
const home = require('./src/controllers/home');
const usuario = require('./src/controllers/usuario');
const livro = require('./src/controllers/livros');
// const generoLivro = require('./src/controllers/generoLivro');
// const isAdmin = require('./s');


// Iniciando as rotas
route.post('/livrosADM', livro.createLivro)
route.post('/login', usuario.verificarUser);
route.post('/registro', usuario.createUser);
// route.post('/livrosADM', );
route.get('/logout', usuario.logout);


route.get('/', home.pagInicialGet);
route.get('/inicio', home.pagInicialGet);
route.get('/livros', home.pagLivrosGet);
route.get('/favoritos', home.pagFavoritosGet);
route.get('/emprestimos', home.pagEmprestimosGet);
route.get('/livrosADM', home.isAdmin, home.pagLivrosADMGet);
route.get('/usuariosADM', home.isAdmin, home.pagUsuariosADMGet);
route.get('/emprestimosADM', home.isAdmin, home.pagEmprestimosADMGet);

module.exports = route;

