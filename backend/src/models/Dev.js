const { Schema, model } = require('mongoose') // Importando apenas Schema e model do pacote mongoose

// Criação do schema do banco
const DevSchema = new Schema({ // Cria automaticamente um campo _id
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
}, {
    timestamps: true, // Cria automaticamente as colunas createdAt e updatedAt.
})

module.exports = model('Dev', DevSchema)