const express = require('express') // Biblioteca de rotas
const mongoose = require('mongoose') // Biblioteca de envio de dados ao MongoDB
const cors = require('cors') // Biblioteca de permitir acesso a aplicação de qualquer endereço para o React e React Native

const routes = require('./routes') // Importação das rotas criadas

const server = express() // Criação do servidor

// Conexão com o Banco de Dados
mongoose.connect('mongodb+srv://lucas:lucas26xd@cluster0-mmleq.mongodb.net/omnistack8?retryWrites=true&w=majority', {useNewUrlParser: true})

server.use(cors())
server.use(express.json())
server.use(routes)

// Ligando o server na porta 3333
server.listen(3333)