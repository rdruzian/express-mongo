import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ValidationError extends RequisicaoIncorreta {
    constructor(erro){
        const mensagensErros = Object.values(erro.errors).map(erro => erro.message).join("; ")
        super(`Erros encontrados ${mensagensErros}`)
    }
}

export default ValidationError