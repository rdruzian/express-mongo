import livro from "../models/Livros.js"

class LivroController{
    static async listarLivros(req, res) {
        try{
            const listaLivros = await livro.find({})
            res.status(200).json(listaLivros)
        } catch(erro){
            res.status(500).json({message: `${erro.message} - falha na requisição`})
        } 
    }

    static async buscaLivroById(req, res){
        try{
            const id = req.params.id
            const livroEncontrado = await livro.findById(id)
            res.status(200).json(livroEncontrado)
        } catch(erro){
            res.status(500).json({message: `${erro.message} - falha na requisição`})
        } 
    }

    static async cadastrarLivro(req, res) {
        try{
            const novoLivro = await livro.create(req.body)
            res.status(201).json({ message: "criado com sucesso", livro: novoLivro })
        } catch(erro) {
            res.status(500).json({ message: `${erro.message} - erro ao cadastrar livro` })
        }
    }

    static async atualizarLivroById(req, res){
        try{ 
            const id = req.params.id
            await livro.findByIAndUpdated(id, req.body)
            res.status(200).json(livro)
        } catch(erro){
            res.status(500).json({message: `${erro.message} - falha na requisição`})
        } 
    }
}

export default LivroController
