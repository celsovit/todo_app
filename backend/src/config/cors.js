/*
    Middleware de CORS
    Adiciona dados no cabeçalho de resposta que será enviada ao navegador
*/

module.exports = function(request, response, next) {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

    next()  // continua o fluxo da aplicação
}
