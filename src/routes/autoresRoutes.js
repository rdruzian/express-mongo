import express from "express"
import AutorController from "../controllers/autorController.js"

const routes = express.Router()

routes.get("/autores", AutorController.listarAutores)
routes.get("/autores/:id", AutorController.buscaAutorById)
routes.post("/autores", AutorController.cadastrarAutor)
routes.put("/autores/:id", AutorController.atualizarAutorById)
routes.delete("/autores/:id", AutorController.excluirAutor)

export default routes