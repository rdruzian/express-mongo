import express from "express"
import conecta from "./config/dbConnect.js"
import routes from "./routes/index.js"

const conexao = await conecta()

conexao.on("error", (error) => {
    console.error("erro de conexao", erro)
})

conexao.once("open", () => {
    console.log("Conexao com sucesso")
})

const app = express()
routes(app)

app.get("/", (req, res) => {
    res.status(200).send("Curso NodeJs e Express")
})

app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id)
    livros.splice(index, 1)
    res.status(200).send("livro removido") // pode-se usar o status 204 também nesse caso
})

export default app