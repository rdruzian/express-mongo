/* eslint-disable no-unused-vars */
import mongoose from "mongoose"
import ErroBase from "../erros/ErroBase.js"
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js"
import ValidationError from "../erros/VAlidationError.js"

function errorHandler(erro, req, res, next) {
    if (erro instanceof mongoose.Error.CastError){
      new RequisicaoIncorreta().enviarResposta(res)
    } else if (erro instanceof mongoose.Error.ValidationError) {
      new ValidationError(erro).enviarResposta(res)
    } else if (erro instanceof ErroBase) {
      erro.enviarResposta(res)
    } else {
      new ErroBase().enviarResposta(res)
    }
}

export default errorHandler