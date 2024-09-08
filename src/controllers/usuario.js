const sequelize = require("sequelize");
const Usuario = require("../model/usuario");

module.exports = {

    async createUser(req, res){
        const dados = req.body;
        
        if(dados.admin){
            await Usuario.create({
                Nome: dados.nome,
                CPF: dados.cpf,
                DataNascimento: dados.data_nasc,
                Telefone: dados.telefone,
                Email: dados.email,
                Genero: dados.sexo,
                Senha: "123456",
                Ativo: 1,
                Admin: dados.admin
            });

            return
        }

        await Usuario.create({
            Nome: dados.nome,
            CPF: dados.cpf,
            DataNascimento: dados.data_nasc,
            Telefone: dados.telefone,
            Email: dados.email,
            Genero: dados.sexo,
            Senha: dados.senha,
            Ativo: 1,
            Admin: 0
        });
        
        res.redirect('/');
        
    },
    
    async verificarUser(req, res){
        const dados = req.body;
        
        const usuarios = await Usuario.findOne({
            raw: true,
            attributes: ['IDUsuario', 'Email', 'Senha', 'Admin', 'Ativo'],
            where: { Email : dados.email_login  }
        });
        
        if (usuarios && usuarios.Ativo == 1) {
            if (dados.senha_login == usuarios.Senha) {
                
                req.session.IDUsuario = usuarios.IDUsuario;
                req.session.isLoggedIn = true;
                
                if(usuarios.Admin == 1){
                    req.session.Admin = 1;
                    return res.redirect("/livrosADM");
                }
                
                req.session.Admin = 0;
                return res.redirect("/inicio");
                
            } else {
                return res.redirect("/");
            }
        } else {
            return res.redirect("/");
        }
    },
    
    async updateUser(req, res){
        const dados = req.body;
        
        await Usuario.update({
            Nome: dados.nome,
            CPF: dados.cpf,
            DataNascimento: dados.data_nasc,
            Telefone: dados.telefone,
            Email: dados.email,
            Genero: dados.sexo,
            Senha: dados.senha,
            Ativo: 1,
            Admin: 0
        },{
            where: { IDUsuario: req.session.IDUsuario }
        });
     
        res.redirect('/');
    },

    async updateUserADM(req, res){
        const dados = req.body;
        let id_user = req.params.id;

        console.log("editar");
        
        await Usuario.update({
            Nome: dados.nome,
            CPF: dados.cpf,
            DataNascimento: dados.data_nasc,
            Telefone: dados.telefone,
            Email: dados.email,
            Genero: dados.sexo,
            Ativo: 1,
            Admin: dados.admin
        },{
            where: { IDUsuario: id_user }
        });
     
        res.redirect('/usuariosADM');
    },

    async deleteUser(req, res) {
        let id_user= req.params.id; 
        
        await Usuario.update({
            Ativo: 0
        },{
            where: { IDUsuario: id_user }
        });

        res.redirect('/usuariosADM');
    },

    async logout(req, res) {
        req.session.destroy();
        res.redirect('/');      
    }
}


