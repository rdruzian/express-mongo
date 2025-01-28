import express from "express"
import conecta from "./config/dbConnect.js"
import livro from "./models/Livros.js"

const conexao = await conecta()

conexao.on("error", (error) => {
    console.error("erro de conexao", erro)
})

conexao.once("open", () => {
    console.log("Conexao com sucesso")
})

const app = express()
app.use(express.json())


app.get("/", (req, res) => {
    res.status(200).send("Curso NodeJs e Express")
})

app.get("/livros", async (req, res) => {
    const listaLivros = await livro.find({})
    res.status(200).json(listaLivros)
})

app.get("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id)
    res.status(200).json(livros[index])
})

app.post("/livros", (req, res) => {
    livros.push(req.body)
    res.status(201).send("livro cadastrado")
})

app.put("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id)
    livros[index].titulo = req.body.titulo
    res.status(200).json(livros)
})

app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id)
    livros.splice(index, 1)
    res.status(200).send("livro removido") // pode-se usar o status 204 também nesse caso
})

export default app