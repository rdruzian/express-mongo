import mongoose from "mongoose"

const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: mongoose.Schema.Types.String, required: [true, "Título do livro é obrigatório"] },
    editora: { type: mongoose.Schema.Types.String, required: [true, "Editora é obrigatória"] },
    preco: { type: Number },
    paginas: { type: Number },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: "autor", required: [true, "Autor é obrigatório"] }
}, { versionKey: false })

const livro = mongoose.model("livros", livroSchema)

export default livro