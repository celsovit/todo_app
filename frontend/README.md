# TODO APP :: Frontend

Frontend desenvolvido com React.JS.

Consulte o tópico [Saiba Mais](#saiba-mais) ao final deste documento para obter mais informações e links com materiais interessantes sobre o tema.

## Passos iniciais:

```bash

$ cd todo_app

# Criar os diretórios da aplicação
$ mkdir frontend && cd frontend

# Criar package.json com yes para todas as perguntas
$ npm init -y

# Instala dependências necessárias no desenvolvimento
$ npm i --save-dev webpack@1.14.0 webpack-dev-server@1.16.2

$ npm i --save-dev babel-core@6.22.1 babel-loader@6.2.10 babel-plugin-react-html-attrs@2.0.0 \ 
babel-plugin-transform-object-rest-spread@6.22.0 babel-preset-es2015@6.22.0 babel-preset-react@6.22.0

# Dependências de processamento de CSS, carregamento de imagens, fontes, etc
$ npm i --save-dev extract-text-webpack-plugin@1.0.1 css-loader@0.26.1 style-loader@0.13.1 file-loader@0.9.0

# Dependências bootstrap e font-awesome
$ npm i --save-dev bootstrap@3.3.7 font-awesome@4.7.0

# Dependências react e axios
$ npm i --save-dev react@15.4.2 react-dom@15.4.2 react-router@3.0.2 axios@0.15.3

```

Após os passos acima, teremos um package.json conforme abaixo:

```json
{
  "name": "frontend",
  "version": "1.0.0",
  "description": "API REST desenvolvida com Javascript, Express e outras dependências em versões mais antigas.",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "axios": "^0.15.3",
    "babel-core": "^6.22.1",
    "babel-loader": "^6.2.10",
    "babel-plugin-react-html-attrs": "^2.0.0",
    "babel-plugin-transform-object-rest-spread": "^6.22.0",
    "babel-preset-es2015": "^6.22.0",
    "babel-preset-react": "^6.22.0",
    "bootstrap": "^3.3.7",
    "css-loader": "^0.26.1",
    "extract-text-webpack-plugin": "^1.0.1",
    "file-loader": "^0.9.0",
    "font-awesome": "^4.7.0",
    "react": "^15.4.2",
    "react-dom": "^15.4.2",
    "react-router": "^3.0.2",
    "style-loader": "^0.13.1",
    "webpack": "^1.14.0",
    "webpack-dev-server": "^1.16.2"
  }
}

```

Que no decorrer da videoaula foram propostas algumas alterações, especificamente na linha `"scripts"`, deixando-o assim:

```json
{
  "name": "frontend",
  "version": "1.0.0",
  "description": "API REST desenvolvida com Javascript, Express e outras dependências em versões mais antigas.",
  "main": "index.js",
  "scripts": {
    "dev": "webpack-dev-server --progress --colors --inline --hot",
    "production": "webpack --progress -p"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "axios": "^0.15.3",
    "babel-core": "^6.22.1",
    "babel-loader": "^6.2.10",
    "babel-plugin-react-html-attrs": "^2.0.0",
    "babel-plugin-transform-object-rest-spread": "^6.22.0",
    "babel-preset-es2015": "^6.22.0",
    "babel-preset-react": "^6.22.0",
    "bootstrap": "^3.3.7",
    "css-loader": "^0.26.1",
    "extract-text-webpack-plugin": "^1.0.1",
    "file-loader": "^0.9.0",
    "font-awesome": "^4.7.0",
    "react": "^15.4.2",
    "react-dom": "^15.4.2",
    "react-router": "^3.0.2",
    "style-loader": "^0.13.1",
    "webpack": "^1.14.0",
    "webpack-dev-server": "^1.16.2"
  }
}

```

É muito importante também criar o arquivo `.gitignore` para que a pasta node_modules não seja levada aos repositórios git/github.

Para recriar a pasta `node_modules` com todas as dependências descritas no arquivo `package.json`, basta executar:

```bash
$ npm install
```

## Codificação do projeto

Os próximos passos seguem no VS Code com a codificação da aplicação, bem como a criação na raiz da aplicação _(pasta frontend)_:

- arquivo [`webpack.config.js`](./webpack.config.js) responsável pelo processo de construção (build) da aplicação.

- pasta `public` contendo o arquivo [index.html](./public/index.html) onde o React injeta o código das páginas.

- pasta `src` contendo a subpasta `main` e o arquivo `index.jsx`,responsável por renderizar componentes no arquivo `public/index.html`.

- arquivo `app.jsx` na subpasta `main`, como o componente principal da aplicação.


## Empacotando e acessando no navegador

Finalmente para empacotar todo esse conteúdo e torna-lo acessível no navegador _(http://localhost:8080)_, basta executar no terminal, o seguinte comando:

```bash
$ npm run dev
```


## Saiba Mais:

- [How to React with Webpack 5 - Setup Tutorial](https://www.robinwieruch.de/minimal-react-webpack-babel-setup/)

- [Webpack website](https://webpack.js.org/)

