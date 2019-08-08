import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import Login from './pages/Login'
import Main from './pages/Main' 

export default function Routes() { // Exportando as rotas da aplicação.
    /**
     * O login é na rota / e necessita do campo 'exact' para as demais rotas que iniciam com '/' serem ouvidas
     * As requisições feita na URL/dev/:id serão enceminhadas para o componente Main. O ':id' é a variável que será resgatadana Main
     */
    return (
        <BrowserRouter> 
            <Route path="/" exact component={Login} />
            <Route path="/dev/:id" component={Main} />
        </BrowserRouter>
    )
}