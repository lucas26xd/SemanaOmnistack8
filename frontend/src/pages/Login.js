import React, {useState} from 'react'

import './Login.css'

import api from '../services/api'
import logo from '../assets/logo.svg'

export default function Login({history}) { // O componente Login usa o objeto 'history' para encaminhar o dev para a próxima página
    const [username, setUsername] = useState('') // Usado para setar o username do dev ao clicar no submit

    async function handleSubmit(e) { // Função chamada quando o botão é pressionado
        e.preventDefault() // Envita o funcionamento padrão
        
        const response = await api.post('/devs', { // Requisita ao backend os dados do novo Dev
            username, // Envia o username
        })

        const {_id} = response.data // Pega o id do novo Dev

        history.push(`/dev/${_id}`) // Encaminha-o para a próxima página
    }
    // Cria formulário de tela inicial
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev"/>
                <input 
                    placeholder="Digite seu usuário no GitHub" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}