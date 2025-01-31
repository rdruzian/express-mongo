import mongoose from "mongoose"

const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: mongoose.Schema.Types.String, required: [true, "Título do livro é obrigatório"] },
    editora: { 
        type: mongoose.Schema.Types.String, 
        required: [true, "Editora é obrigatória"], 
        enum: {
            values: ["Casa do código", "Alura"],
            message: "A editora {VALUE} não é um valor permitido"
        }
     },
    preco: { type: Number },
    paginas: { 
        type: Number, 
        min: [0, "O número de páginas deve estar ente 0 e 5000. Valor fornecido {VALUE}"], 
        max: [5000, "O número de páginas deve estar ente 0 e 5000. Valor fornecido {VALUE}"] 
    },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: "autor", required: [true, "Autor é obrigatório"] }
}, { versionKey: false })

const livro = mongoose.model("livros", livroSchema)

export default livro