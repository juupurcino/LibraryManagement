const sequelize = require('sequelize');
 
const database = new sequelize('PlotPit', 'Biblioteca', 'senha123',
{
    dialect: 'mssql', host:'localhost', port: 49978
});
 
database.sync()

module.exports = database;