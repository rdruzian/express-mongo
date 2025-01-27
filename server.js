import http from "http" //lib padrão do node

const rotas = {
    "/": "Curso de NodeJS e Express"
}

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text:plain"})
    res.end(rotas[req.url])
})

server.listen(3000, () => {
    console.log("servidor escutando!")
})