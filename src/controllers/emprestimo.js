const Emprestimo = require("../model/emprestimo");
const Usuario = require("../model/usuario");
const Livro = require("../model/livro");
const sequelize = require("sequelize");

module.exports = {
    
    async createEmprestimo(req, res){
        const dados = req.body;

        const usuario = await Usuario.findOne({
            raw: true,
            attributes: ['IDUsuario'],
            where: { CPF : dados.cpf }
        });

        const livro = await Livro.findOne({
            raw: true,
            attributes: ['IDLivro'],
            where: { ISBN : dados.isbn }
        });

        if(livro.IDLivro && usuario.IDUsuario){
            await Emprestimo.create({
                DataEmprestimo: dados.data_emprestimo,
                DataDevolucao: dados.data_devolucao,
                Multa: dados.multa,
                IDUsuario: usuario.IDUsuario,
                IDLivro: livro.IDLivro
            });

            return res.redirect('/emprestimosADM');
        }
        return res.redirect('/livrosADM');
    },
    
    async updateEmprestimo(req, res) {
        const dados = req.body;
        let id_emp = req.params.id; 

        const usuario = await Usuario.findOne({
            raw: true,
            attributes: ['IDUsuario'],
            where: { CPF : dados.cpf }
        });
        
        const livro = await Livro.findOne({
            raw: true,
            attributes: ['IDLivro'],
            where: { ISBN : dados.isbn }
        });

        if(livro.IDLivro && usuario.IDUsuario){
            await Emprestimo.update({
                DataEmprestimo: dados.data_emprestimo,
                DataDevolucao: dados.data_devolucao,
                Multa: dados.multa,
                IDUsuario: usuario.IDUsuario,
                IDLivro: livro.IDLivro
            },{
                where:{IDEmprestimo : id_emp}
            });

            res.redirect('/emprestimosADM');
        }
        res.redirect('/emprestimosADM');
    },

    async devolucao(req, res) {
        let id_emprestimo= req.params.id; 
        
        await Emprestimo.update({
            Devolvido: 1
        },{
            where: { IDEmprestimo: id_emprestimo }
        });

        res.redirect('/emprestimosADM');
    }


};
