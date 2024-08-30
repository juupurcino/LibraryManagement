const Sequelize = require('sequelize');
const database = require('../config/db');
const usuario = require('./usuario');
const livro = require('./livro');

const emprestimo = database.define('Emprestimo', {
    
    IDEmprestimo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    DataEmprestimo: {
        type: Sequelize.DATE,
        allowNull: false
    },

    DataDevolucao: {
        type: Sequelize.DATE,
        allowNull: false
    },

    Multa: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

favorito.belongsTo(usuario, {
    constraint: true, 
    foreignKey: 'IDUsuario'
});

favorito.belongsTo(livro, {
    constraint: true, 
    foreignKey: 'IDLivro'
});

module.exports = emprestimo;