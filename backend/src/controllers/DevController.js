const axios = require('axios') // Biblioteca de requisição de API (uma das formas)

const Dev = require('../models/Dev') // Importação do modelo

module.exports = {
    async index(req, res) { // Função chamada ao ser requisitado a listagem de devs
        const {user} = req.headers // Pega o ID do usário passado no header da requisição
        const loggedDev = await Dev.findById(user) // Pega toda estrutura do Dev pelo seu ID
        const users = await Dev.find({ // Procura no banco, usando o operador AND, por ...
            $and: [ //$and: "Operador AND", $ne: "Not Equal", $nin: "Not In"
                {_id: {$ne: loggedDev._id}}, // Usuários que não seja o próprio logado
                {_id: {$nin: loggedDev.likes}}, // Usuários que ainda não foram "Likados" pelo usuário logado
                {_id: {$nin: loggedDev.dislikes}}, // Usuários que ainda não foram "Dislikados" pelo usuário logado
            ],
        })
        return res.json(users) // Retorna o resultado da busca
    },

    async store(req, res) { // Função chamada para cadastrar novos Devs
        const {username} = req.body // Recebe 'username' pelo corpo da requisição
        
        //Verificação se o usuário indicado já existe no banco
        const userExists = await Dev.findOne({user: username})
        if (userExists) {
            return res.json(userExists) // Retorna o usuário já cadastrado
        }

        const response = await axios.get(`https://api.github.com/users/${username}`) // Requisita à API do GitHub os dados do usuário solicitado
        
        const {name, bio, avatar_url: avatar} = response.data // seleciona apenas estas informações

        // Cadastra usuário no Banco de Dados (como as variáveis estão com o mesmo nome, não precisa repetir para colocar no formato padrão de JSON)
        const dev = await Dev.create({
            name,
            user: username,
            bio, 
            avatar,
        })

        return res.json(dev) // Retorna usuário cadastrado
    }
}