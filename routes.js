// Iniciando Route do Express
const express = require('express');
const route = express.Router();

// Importando os Controllers
const home = require('./src/controllers/home');
const cadastrar = require('./src/controllers/cadastrar');
// const isAdmin = require('./s');


// Iniciando as rotas
route.get('/', cadastrar.usuario);
route.post('/login', cadastrar.verificarUser);
route.post('/registro', cadastrar.createUser);
route.get('/logout', cadastrar.logout);

route.get('/inicio', home.pagInicialGet);
route.get('/livros', home.pagLivrosGet);
route.get('/favoritos', home.pagFavoritosGet);
route.get('/emprestimos', home.pagEmprestimosGet);
route.get('/livrosADM', home.isAdmin, home.pagLivrosADMGet);
route.get('/usuariosADM', home.isAdmin, home.pagUsuariosADMGet);
route.get('/emprestimosADM', home.isAdmin, home.pagEmprestimosADMGet);

module.exports = route;

