import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3333' // URL base da aplicação
})

export default api