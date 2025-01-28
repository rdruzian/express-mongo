import livro from "../models/Livros.js"
import { autor } from "../models/Autor.js"
 
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
        const novoLivro = req.body
        try{
            const autorEncontrado = await autor.findById(novoLivro.autor)
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } } 
            const livroCriado = await livro.create(livroCompleto)
            res.status(201).json({ message: "criado com sucesso", livro: livroCriado })
        } catch(erro) {
            res.status(500).json({ message: `${erro.message} - erro ao cadastrar livro` })
        }
    }

    static async atualizarLivroById(req, res){
        try{ 
            const id = req.params.id
            await livro.findByIdAndUpdate(id, req.body)
            res.status(200).json( {message: "livro atualizado"} )
        } catch(erro){
            res.status(500).json({message: `${erro.message} - falha na requisição`})
        } 
    }

    static async excluirLivro(req, res){
        try{ 
            const id = req.params.id
            await livro.findByIdAndDelete(id)
            res.status(200).json({message: "livro excluido"})
        } catch(erro){
            res.status(500).json({message: `${erro.message} - falha na requisição`})
        } 
    }

    static async listarLivrosByEditora(req, res) {
        const editora = req.query.editora
        try{
            const livrosByEditora = await livro.find({ editora: editora })
            res.status(200).json(livrosByEditora)
        } catch(erro){
            res.status(500).json({message: `${erro.message} - falha na requisição`})
        }
    }
}

export default LivroController
