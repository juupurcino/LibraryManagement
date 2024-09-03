// Iniciando Route do Express
const express = require('express');
const route = express.Router();

// Importando os Controllers
const home = require('./src/controllers/home');
const usuario = require('./src/controllers/usuario');
<<<<<<< HEAD
const emprestimo = require('./src/controllers/emprestimo');
// const isAdmin = require('./s');


// Rotas do usuario
route.post('/login', usuario.verificarUser);
route.post('/registro', usuario.createUser);
route.get('/logout', usuario.logout);

// Rotas do Emprestimo ADM
route.get('/emprestimosADM', home.isAdmin, home.pagEmprestimosADMGet);
route.post('/emprestimo', emprestimo.createEmprestimo);
=======
const livro = require('./src/controllers/livros');
// const generoLivro = require('./src/controllers/generoLivro');
// const isAdmin = require('./s');


// Iniciando as rotas
route.post('/livrosADM', livro.createLivro)
route.post('/login', usuario.verificarUser);
route.post('/registro', usuario.createUser);
// route.post('/livrosADM', );
route.get('/logout', usuario.logout);

>>>>>>> origin/Juliana

route.get('/', home.pagInicialGet);
route.get('/inicio', home.pagInicialGet);
route.get('/livros', home.pagLivrosGet);
route.get('/favoritos', home.pagFavoritosGet);
route.get('/emprestimos', home.pagEmprestimosGet);
route.get('/livrosADM', home.isAdmin, home.pagLivrosADMGet);
route.get('/usuariosADM', home.isAdmin, home.pagUsuariosADMGet);

module.exports = route;

