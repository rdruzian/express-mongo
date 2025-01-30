import express from "express"
import conecta from "./config/dbConnect.js"
import routes from "./routes/index.js"
import errorHandler from "./middlewares/ErrorHandler.js"
import handler404 from "./middlewares/Handler404.js"

const conexao = await conecta()

conexao.on("error", console.log.bind(console, "erro de conexao"))

conexao.once("open", () => { console.log("Conexao com sucesso") })

const app = express()
app.use(express.json())
routes(app)

app.use(handler404)

app.use(errorHandler)

export default app