module.exports = {
   
    async pagIndexGet(req, res){
        res.render('../views/index');
    },

    async pagInicialGet(req, res){
        res.render('../views/inicio');
    },
    
    async pagLivrosGet(req, res){
        res.render('../views/livros');
    },

    async pagFavoritosGet(req, res){
        res.render('../views/favoritos');
    },
    
    async pagEmprestimosGet(req, res){
        res.render('../views/emprestimos');
    }
}