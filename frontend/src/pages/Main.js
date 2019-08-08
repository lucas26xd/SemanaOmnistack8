import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import './Main.css'

import api from '../services/api'

import logo from '../assets/logo.svg'
import like from '../assets/like.svg'
import dislike from '../assets/dislike.svg'

export default function Main({match}) { // O componente Main usa o objeto 'match' para pegar o id do dev novo passado na URL
    const [users, setUsers] = useState([]) // Usado para setar no vetor de users retornados

    useEffect(() => {
        async function loadUser() { // Requisita ao backend a listagem dos outros devs
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id // Passando o id do dev que está pesquisando
                }
            })
            setUsers(response.data) // Ao setar no array os devs retornados, o React já renderiza novamente todos os componentes
        }

        loadUser()
    }, [match.params.id]) // O useEffect é executado sempre que o 'match.params.id' (neste caso) for alterado

    async function handleLike(id) { // Requisição de like do dev atual em outro ao backend
        await api.post(`/devs/${id}/likes`, null, {
            headers: {user: match.params.id}
        })

        setUsers(users.filter(user => user._id !== id)) // Retira o dev com like da tela
    }

    async function handleDislike(id) { // Requisição de dislike do dev atual em outro ao backend
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: {user: match.params.id}
        })

        setUsers(users.filter(user => user._id !== id)) // Retira o dev com dislike da tela
    }
    /**
     * Link para a raiz ao clicar na imagem do sistema
     * Se o número de usuários disponíveis for igual a 0 (zero) mostra o texto 'Acabou :('
     * Para cada dev retornado pelo backend, faz uma div referenciada pelo id do dev que é mostrado, contendo foto, nome e bio
     * além dos botões de Like e Dislike, onde por uma "gambiarra" chama suas respectivas funções passando o id do Dev dono daquele botão
     */
    return (
        <div className="main-container">
            <Link to="/">
            <img src={logo} alt="Tindev"/>
            </Link>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <img src={user.avatar} alt={user.name} />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>
                            <div className="buttons">
                                <button type="button" onClick={() => handleDislike(user._id)}>
                                    <img src={dislike} alt="Dislike" />
                                </button>
                                <button type="button" onClick={() => handleLike(user._id)}>
                                    <img src={like} alt="Like" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (<div className="empty">Acabou :(</div>)}
            
        </div>
    )
}