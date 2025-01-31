/* eslint-disable no-unused-vars */
import NotFound from "../erros/NotFound.js"
import {autor} from "../models/Autor.js"

class AutorController {

  static listarAutores = async(req, res) => {
    try {
      const autoresResultado = await autor.find()

      res.status(200).json(autoresResultado)
    } catch (erro) {
      res.status(500).json({ message: "Erro interno no servidor" })
    }
  }

  static buscaAutorById = async (req, res, next) => {
    try {
      const id = req.params.id

      const autorResultado = await autor.findById(id)
      if (autorResultado !== null) {
        res.status(200).send(autorResultado)
      } else {
        next(new NotFound("Id do Autor não localizado."))
      }
    } catch(erro){
      next(erro)
    }
  }
  
  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autor(req.body)

      const autorResultado = await autor.save()

      res.status(201).send(autorResultado.toJSON())
    } catch (erro) {
      next(erro)
    }
  }

  static atualizarAutorById = async (req, res, next) => {
    try {
      const id = req.params.id

      const autorResultado = await autor.findByIdAndUpdate(id, {$set: req.body})

      if (autorResultado !== null) {
        res.status(200).send({message: "Autor atualizado com sucesso"});
      } else {
        next(new NotFound("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro)
    }
  }

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id

      const autorResultado = await autor.findByIdAndDelete(id);


      if (autorResultado !== null) {
        res.status(200).send({message: "Autor removido com sucesso"});
      } else {
        next(new NotFound("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro)
    }
  }
}

export default AutorController