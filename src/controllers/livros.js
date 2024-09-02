const sequelize = require("sequelize");
const db = require("../config/db");
const Livro = require("../model/livro");

module.exports = {

    async createLivro(req, res){
        const dados = req.body;
        let foto = 'livro.png';

        // Verificando se foi enviada alguma foto
        if (req.file) {
            // Pegar novo nome da foto
            foto = req.file.filename;
        }

        await Livro.create({
            ISBN: dados.isbn,
            Titulo: dados.titulo,
            Autor: dados.autor,
            Ano: dados.ano,
            Descricao: dados.descricao,
            Genero: dados.genero,
            Foto: foto,
            Senha: dados.senha,
            Disponibilidade: 1,
            Qts_emprestimo: 0
        });

        res.redirect('/livrosADM');
    }
}