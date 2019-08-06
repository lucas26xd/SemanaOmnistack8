const axios = require('axios')
const Dev = require('../models/Dev')

module.exports = {
    async store(req, res) {
        const { username } = req.body

        const response = await axios.get(`https://api.github.com/users/${username}`)
        
        const {name, bio, avatar_url: avatar}

        const dev = await Dev.create({
            name: name,
            user: username,
            bio: bio, 
            avatar: avatar
        })

        return res.json(response.data)
    }
}