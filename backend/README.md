# Todo App

API REST desenvolvida com Javascript, Express e outras dependências em versões mais antigas.

Consulte o tópico [Saiba Mais](#saiba-mais) ao final deste documento para obter mais informações e links com materiais interessantes sobre o tema.


```bash

# Criar os diretórios da aplicação
$ mkdir todo_app && cd todo_app
$ mkdir backend && cd backend

# Criar package.json com yes para todas as perguntas
$ npm init -y

# Instala dependências necessárias no desenvolvimento e produção
$ npm i --save -E body-parser@1.15.2 express@4.14.0 \ 
  mongoose@^6.0.8 node-restful@0.2.5 pm2@2.1.5

# Instala dependência necessária apenas no desenvolvimento
# -E indica que deve ser instalada a versão especificada
$ npm i --save-dev -E nodemon@1.11.0

```

Após os passos acima, teremos um package.json conforme abaixo:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "```bash",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "1.15.2",
    "express": "4.14.0",
    "mongoose": "^6.0.8",
    "node-restful": "0.2.5",
    "pm2": "2.1.5"
  },
  "devDependencies": {
    "nodemon": "1.11.0"
  }
}
```

Que no decorrer da videoaula foram propostas algumas alterações, especificamente nas linhas main e scripts, deixando-o assim:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "src/loader.js",
  "scripts": {
    "dev": "nodemon",
    "production": "pm2 start src/loader.js --name todo-app"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "1.15.2",
    "express": "4.14.0",
    "mongoose": "^6.0.8",
    "node-restful": "0.2.5",
    "pm2": "2.1.5"
  },
  "devDependencies": {
    "nodemon": "1.11.0"
  }
}
```

É muito importante também criar o arquivo `.gitignore` para que a pasta node_modules não seja levada aos repositórios git/github.

Para recriar a pasta `node_modules` com todas as dependências descritas no arquivo `package.json`, basta executar:

```bash
$ npm install
```

Com isso, seguindo as videoaulas foi criada uma nova pasta `src` com o arquivo `loader.js` e demais arquivos, conforme constam aqui no repositório.

Para habilitar um servidor MongoDB a partir de um container Docker, execute o comando a seguir:

```bash
$ docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
```

Para executar o servidor, faça:

```bash

# acessar pasta backend
cd backend

# para ambiente de desenvolvimento (nodemon)
$ npm run dev

# para ambiente de produção (pm2 - vide 'Saiba mais')
$ npm run production

```

## Interagindo com o servidor

Para adicionar, atualizar, deletar ou listar dados, podemos utilizar os endpoints da API a partir de uma aplicação como Insomnia ou Postman.

 O envio de dados para a API deve ser através da opção `Form URL Encoded` do Insomnia ou `x-www-form-urlencoded` do Postman, passando algum valor pelo menos para o campo obrigatório `description`, conforme abaixo:

- incluir registro (POST)
  - http://localhost:3003/api/todos

    ```yaml
    description: Pagar o cartão de crédito
    ```

- atualizar registro (PUT passando o ID)
  - http://localhost:3003/api/todos/6627281f17e1ac7a39064d12

    ```yaml
    description: Uma nova descrição
    done: true
    ```

- obter um registro (GET passando o ID)
  - http://localhost:3003/api/todos/66272db37646c79fad4c920d

- obter todos os registros (GET sem passar ID)
  - http://localhost:3003/api/todos

- obter todos os registros ordenado (GET sem passar ID)
  - http://localhost:3003/api/todos?sort=descrition

- obter todos os registros ordenado de forma decrescente (-description)
  - http://localhost:3003/api/todos?sort=-descrition

- obter todos os registros filtrando com REGEX
  - http://localhost:3003/api/todos?sort=-createdAt&description__regex=/curso/


## Container MongoDB

```bash

# criar um container mongoDB
$ docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest

# exibir os containers em execução
$ docker ps

# exibir os containers em execução ou parados
$ docker ps -a

# reiniciar um container parado
$ docker start <id ou nome do container>

```

## Acesso ao shell do MongoDB (TO-DO's collection)

```bash

# acessar ao terminal Linux do container
$ docker exec -it <ID do contêiner> bash

# iniciar o shell do MongoDB
$ mongosh     # quit() para encerrar

# exibir todos os bancos de dados
$ show databases

# selecionar o banco de dados 'todo'
$ use todo

# exibir todas as coleções em um banco de dados
$ show collections

# selecionar a coleção 'todos' do banco de dados
$ db.todos

# consultar os documentos na coleção to-do's
$ db.todos.find()

# consultar documentos na coleção utilizando critérios
$ db.todos.find({ campo1: "valor1" })

```

## Exemplos de consulta

```bash

# filtrando com REGEX
$ db.todos.find({ description: /curso/ })

# pesquisa pelo ID
$ db.todos.find({ _id: ObjectId('6627280317e1ac7a39064d10') })
```

#### As duas pesquisas trarão o mesmo resultado:

```json
[
  {
    _id: ObjectId('6627280317e1ac7a39064d10'),
    description: 'Concluir curso de React',
    done: false,
    createdAt: ISODate('2024-04-23T03:16:19.139Z'),
    __v: 0
  }
]
```


## Saiba mais:
- [Você nunca deveria executar o Node.js diretamente em produção... será?](https://www.freecodecamp.org/portuguese/news/voce-nunca-deveria-executar-o-node-js-diretamente-em-producao-sera/)

- [Como usar PM2 com Node.js em Produção](https://danieldcs.com/como-usar-pm2-com-node-js-em-producao/)

- [Instalar a Comunidade MongoDB com Docker](https://www.mongodb.com/pt-br/docs/manual/tutorial/install-mongodb-community-with-docker/)

- [Criando uma API RESTful utilizando Node.js, Express.js e Mongoose](https://community.revelo.com.br/criando-uma-api-restful-utilizando-node-js-express-js-e-mongoose/)

- [How to create a REST API with Node.js and Express](https://blog.postman.com/how-to-create-a-rest-api-with-node-js-and-express/)

- [Node-restful :: Baugarten](https://github.com/baugarten/node-restful)

- [3 Methods to Include CORS in Your Node.js Code for Better Security and Cross-Origin Resource Sharing](https://medium.com/@murgesh.e/3-methods-to-include-cors-in-your-node-js-6b645e0b6fa6)