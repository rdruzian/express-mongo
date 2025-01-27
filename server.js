//import http from "http" //lib padrão do node
import app from "./src/app.js"

app.listen(3000, () => {
    console.log("servidor escutando!")
})