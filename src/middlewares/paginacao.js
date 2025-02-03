import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js"

async function paginacao(req, res, next) {
    try {
        let { limite = 5, pagina = 1, ordenacao = "_id:-1" } =  req.query //?ordenacao=titulo:1 -> formato da busca na url
        let [campoOrdenacao, ordem] = ordenacao.split(":")

        limite = parseInt(limite)
        pagina = parseInt(pagina)
        ordem = parseInt(ordem)

        const resultado = req.resultado

        if (limite > 0 && pagina > 0 ) {
        const resultadoPaginado = await resultado.find()
            .sort({ [campoOrdenacao]: ordem })
            .skip((pagina-1)*limite)
            .limit(limite)
            .populate("autor")
            .exec()

        res.status(200).json(resultadoPaginado)
    } else {
        next(new RequisicaoIncorreta())
    }
    } catch (erro) {
        next(erro)
    }
}

export default paginacao