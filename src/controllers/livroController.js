import NotFound from "../erros/NotFound.js"
import { autores, livros } from "../models/index.js"
class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find()
      req.resultado = buscaLivros
      next()
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

  static listarLivrosByFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query)

      if (busca !== null) {
        const livrosResultado = livros.find(busca).populate("autor")

        req.resultado = livrosResultado
        next()
      } else {
        res.status(200).send([])
      }
     
    } catch (erro) {
      next(erro)
    }
  }
}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros

   //const regex = new RegExp (titulo, "i")

   let busca = {}

   if (editora) busca.editora = editora
   if (titulo) busca.titulo = { $regex: titulo, $options: "i" } //regex // /palavra/ regex JS /palavra/i Ignorar maiusculas e minusculas
   if (minPaginas || maxPaginas) busca.numeroPaginas = {}

   if (minPaginas) busca.numeroPaginas.$gte = minPaginas
   if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas

   if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor })

    if (autor !== null) {
      busca.autor = autor._id
    } else {
      busca = null
    }
   }

   return busca
}

export default LivroController