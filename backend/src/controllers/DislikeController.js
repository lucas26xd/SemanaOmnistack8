const Dev = require('../models/Dev') // Importa o modelo de Dev

module.exports = {
    async store(req, res) { // Função de armazenamento de dislikes no campo do usuário logado
        const {devId} = req.params // Pega ID do usuário "Disikado" pelo usuário logado por parãmetro passado na URL
        const {user} = req.headers // Pega ID do usuário logado pelo header da requisição

        const loggedDev = await Dev.findById(user) // Recebe obejeto inteiro do dev logado
        const targetDev = await Dev.findById(devId) // Recebe objeto inteiro do dev "Dislikado"

        if (!targetDev) { // Verificação se há usuário requisitado para ser "Dislikado"
            return res.status(400).json({error: 'Dev not exists'})
        }

        loggedDev.dislikes.push(targetDev._id)// Inclui na lista de Likes do dev logado, o dev "Dislikado"
        await loggedDev.save() // Salva as alterações feitas

        return res.json(loggedDev) // Retorna o dev logado
    }
}