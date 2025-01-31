 
import NotFound from "../erros/NotFound.js"
import livros from "../models/Livros.js"

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {

      const livrosResultado = await livros.find()
        .populate("autor")
        .exec()

      res.status(200).json(livrosResultado)
    } catch (erro) {
      next(erro)
    }
  }

  static buscaLivroById = async (req, res, next) => {
    try {
      const id = req.params.id

      const livroResultados = await livros.findById(id)
        .populate("autor", "nome")
        .exec()

        if (livroResultados !== null) {
          res.status(200).send(livroResultados);
        } else {
          next(new NotFound("Id do livro não localizado."));
        }
    } catch (erro) {
      next(erro)
    }
  }

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body)

      const livroResultado = await livro.save()

      res.status(201).send(livroResultado.toJSON())
    } catch (erro) {
      next(erro)
    }
  }

  static atualizarLivroById = async (req, res, next) => {
    try {
      const id = req.params.id

      const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body});

      console.log(livroResultado);
    
      if (livroResultado !== null) {
        res.status(200).send({message: "Livro atualizado com sucesso"});
      } else {
        next(new NotFound("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro)
    }
  }

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id

      await livros.findByIdAndDelete(id)

      res.status(200).send({message: "Livro removido com sucesso"})
    } catch (erro) {
      next(erro)
    }
  }

  static listarLivrosByEditora = async (req, res, next) => {
    try {
      const editora = req.query.editora

      const livrosResultado = await livros.find({"editora": editora})

      res.status(200).send(livrosResultado)
     
    } catch (erro) {
      next(erro)
    }
  }
}

export default LivroController