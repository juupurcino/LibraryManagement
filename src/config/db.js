const sequelize = require('sequelize');
 
const database = new sequelize('PlotPit', 'PlotPit', 'etsps2024401',
{
<<<<<<< HEAD
    dialect: 'mssql', host:'localhost', port: 1433
=======
    dialect: 'mssql', host:'localhost', port: 60915
    // dialect: 'mssql', host:'localhost', port: 1433
>>>>>>> origin/Juliana
});
 
database.sync()

module.exports = database;