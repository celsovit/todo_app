# TODO APP :: Frontend Redux

Frontend desenvolvido com React.JS.

Este projeto é uma migração do projeto [Frontend](https://github.com/celsovit/todo_app/tree/main/frontend) que utiliza estado local _(useState)_ para controle de estado com Redux.

## Instalação de dependências

```bash
$ cd todo_app/frontend_redux

$ npm i --save-dev redux@3.6.0
$ npm i --save-dev react-redux@5.0.2

# para usar middleware promise
$ npm i --save-dev redux-promise@0.5.3

# para usar middleware multi (multiplas actions)
$ npm i --save-dev redux-multi@0.1.12

# para usar middleware thunk (gerenciar actions assíncronas)
$ npm i --save-dev redux-thunk@2.2.0
```

## Empacotando e acessando no navegador

Para empacotar e tornar a aplicação acessível no navegador _(http://localhost:8080)_, basta executar no terminal, o seguinte comando:

```bash
$ npm run dev
```

## Mudanças

- Criado arquivo reducers.js

- Criado arquivo todoActions.js

- Criado arquivo todoReducer.js

- Alterado index.jsx: obter a Redux Store e compartilha-la com <Provider>

- Alterado todoList.jsx: passar estado Redux como propriedades do componente

- Alterado todoForm.jsx: 
    - passar estado Redux como propriedades do componente
    - passar funções de manipulação de estado como propriedades do componente
    - modificado onChange do campo Input
    - [modificado todoForm de Function para Classe](#todoform-convertido-de-função-para-classe)

- [Utilização de Middlewares](#a-importância-dos-middlewares)



### TodoForm convertido de função para classe

Para que a lista de dados seja exibida, é necessário busca-los na API de backend. Uma forma de fazer isso é utilizando o método `componentWillMount` que é executado antes que os componentes sejam montados e exibidos na tela.

Somente uma __classe__ é capaz de oferecer o método _componentWillMount_ e esse é o motivo que levou `TodoForm` a se tornar uma [class](./src/todo/todoForm_as_class.jsx), deixando de ser uma [function](./src/todo/todoForm_as_func.jsx).

### A importância dos Middlewares

O método [componentWillMount](./src/todo/todoForm_as_class.jsx) (abaixo) faz uma chamada à [action creator](./src/todo/todoActions.js) `search` que retorna uma action, que submetida ao [reducer](./src/todo/todoReducer.js) recupera os dados _(data)_ vindos da API de backend.

```javascript
// método componentWillMount
componentWillMount() {
    this.props.search()
}
```

```javascript
// action creator
export const search = () => {
    const request = axios.get(`${ URL }?sort=-createdAt`)
    return {
        type: 'TODO_SEARCHED',
        payload: request
    }
}
```

```javascript
// reducer
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'DESCRIPTION_CHANGED':
            return { ...state, description: action.payload }
        case 'TODO_SEARCHED':
            return { ...state, list: action.payload.data }
        default:
            return state
    }
}
```

Note que a _action creator_ utiliza-se do [axios](https://axios-http.com/docs/intro) para se comunicar de forma assíncrona com o backend, e ao invés de dados este devolve uma [promise](https://javascript.info/promise-basics), ou seja, uma promessa futura que não produzirá os resultados imediatos previstos no código acima.

A solução consiste em utilizar um _Middleware Promise_ que aguarda até que a _Promise_ seja resolvida, para então passar ao _Reducer_ os dados por ela retornados. Fazendo apenas algumas modificações no [index.jsx](./src/index.jsx) o código passa a funcionar da maneira esperada.

```javascript
// novos imports
import { applyMiddleware, createStore } from 'redux'
import promise from 'redux-promise'

// aplicando um middleware na criação da Redux Store
const store = applyMiddleware(promise)(createStore)(reducers)

/* const store = (createStore)(reducers)  // versão sem middleware */
```

Em outras comunicações com o backend, como por exemplo, adicionar uma tarefa, será necessário criar uma nova _action creator_ com o _axios_ retornando uma _Promise_ que precisará do Middleware para aguardar sua resolução.

```javascript
// action creator
export const add = (description) => {
    const request = axios.post(URL, { description })
    return {
        type: 'TODO_ADDED',
        payload: request        // uma promise
    }
}
```

#### O que são Middlewares

> Middlewares são funções executadas entre a ação e o estado final da aplicação. São intermediários que nos permitem modificar tanto as ações quanto o estado antes de serem atualizados.
>
> __Fonte:__ [Usando middlewares no Redux :: Revelo Community](https://community.revelo.com.br/usando-middlewares-no-redux/) 
 


## Saiba Mais:

- [How to React with Webpack 5 - Setup Tutorial](https://www.robinwieruch.de/minimal-react-webpack-babel-setup/)

- [Webpack website](https://webpack.js.org/)

- [Dispatch multiple actions from one action creator](https://www.npmjs.com/package/redux-multi)

- [Usando middlewares no Redux](https://community.revelo.com.br/usando-middlewares-no-redux/)

