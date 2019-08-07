const express = require('express') // Biblioteca de escuta de rotas

// Importação dos controllers
const DevController = require('./controllers/DevController')
const LikeController = require('./controllers/LikeController')
const DislikeController = require('./controllers/DislikeController')

const routes = express.Router() // Criação do objeto de rotas

// Listeners de cada rota
routes.get('/devs', DevController.index)
routes.post('/devs/:devId/likes', LikeController.store)
routes.post('/devs/:devId/dislikes', DislikeController.store)
routes.post('/devs', DevController.store)

module.exports = routes