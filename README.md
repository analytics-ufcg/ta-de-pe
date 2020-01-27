# Tá na mesa

Fiscalize os recursos para merenda de escolas públicas perto de você e pressione por uma gestão mais eficiente.

## Sobre este repositório

Aqui encontra-se o frontend e backend da aplicação tá-na-mesa que funcionam em conjunto com o banco de dados fornecido por [este outro repositório](https://github.com/analytics-ufcg/ta-na-mesa-dados).

### Frontend

O frontend é desenvolvido em [Angular](https://angular.io/) e seus arquivos encontram-se no diretório `client`. Para mais informações, leia este [README.md](https://github.com/analytics-ufcg/ta-na-mesa/tree/master/client).

### Backend

O backend é desenvolvido em [NodeJS](https://nodejs.org/en/) e seus arquivos encontram-se no diretório `server`, além do principal arquivo `server.js` na raiz do repositório.

## Dependências

* [NodeJS](https://nodejs.org/en/) v10.15.1 (recomenda-se instalar o node via [nvm](https://github.com/nvm-sh/nvm))
* [AngularCLI](https://cli.angular.io/) v8.3.15

As bibliotecas de dependências serão instaladas usando o `npm`.

## Como desenvolver

Este repositório utiliza [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/). Esses são responsáveis por criar o ambiente de desenvolvimento da aplicação.

### Passo 1

Instale o [docker](https://docs.docker.com/install/) e o [docker-compose](https://docs.docker.com/compose/install/).

### Passo 2

Faça o build da imagem docker com as dependências.

```bash
docker-compose up
```

### Passo 3

Acesse o frontend em http://localhost:4200 e o backend (API) em http://localhost:5000/api.

