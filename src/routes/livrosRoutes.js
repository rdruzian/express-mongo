import express from "express"
import LivroController from "../controllers/livroController.js"

const routes = express.Router()

routes.get("/livros", LivroController.listarLivros)
routes.get("/livros/busca", LivroController.listarLivrosByEditora)
routes.get("/livros/:id", LivroController.buscaLivroById)
routes.post("/livros", LivroController.cadastrarLivro)
routes.put("/livros/:id", LivroController.atualizarLivroById)
routes.delete("/livros/:id", LivroController.excluirLivro)

export default routes