// Iniciando Route do Express
const express = require('express');
const route = express.Router();

// Importando os Controllers
const home = require('./src/controllers/home');


// Iniciando as rotas
route.get('/', home.pagIndexGet);
route.get('/inicio', home.pagInicialGet);
route.get('/livros', home.pagLivrosGet);
route.get('/favoritos', home.pagFavoritosGet);
route.get('/emprestimos', home.pagEmprestimosGet);

module.exports = route;

