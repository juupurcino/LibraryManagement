const sequelize = require('sequelize');
 
const database = new sequelize('PlotPit', 'PlotPit', 'etsps2024401',
{
    dialect: 'mssql', host:'localhost', port: 1433
});
 
database.sync()

module.exports = database;