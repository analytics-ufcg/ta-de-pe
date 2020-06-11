# Tá de Pé? Merenda

Fiscalize os recursos para merenda de escolas públicas perto de você e pressione por uma gestão mais eficiente.

## Sobre este repositório

Aqui encontra-se o frontend e backend da aplicação Tá de Pé Merenda (antiga ta-na-mesa) que funcionam em conjunto com o banco de dados fornecido por [este outro repositório](https://github.com/analytics-ufcg/ta-na-mesa-dados).

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

Crie um arquivo variables.env e copie o conteúdo do arquivo variables.env.sample para dentro dele. Preencha as variáveis com os valores de sua necessidade.

Se estiver usando o banco local para desenvolvimento uma sugestão é utilizar:

```
NODE_ENV=development
POSTGRESURI=postgres://postgres:secret@postgres:5432/tanamesa
```

### Passo 3

Para levantar os serviços do frontend e backend com as dependência execute:

```
docker-compose up
```

### Passo 4

Acesse o frontend em http://localhost:4200 e o backend (API) em http://localhost:5000/api.

### Como instalar novas depedências?

Sempre que for instalar uma nova dependência/pacote via npm será necessário realizar o build da imagem para que a dependência seja instalada no container docker. Para isto siga os passos:

1. Pare os serviços em execução.

2. Execute o build das imagens
```
docker-compose build
```
3. Levante novamente os serviços
```
docker-compose up
```

### Como parar os containers e apagar os volumes criados?

Caso você queira parar os serviços execute:

```
docker-compose down
```

Caso você queira parar os serviços e remover os volumes criados execute:
```
docker-compose down --volumes
```

### Comandos úteis

Para visualizar os containers rodando:

```
docker ps
```

Para executar comandos num shell dentro do container:

```
docker exec -it <container_id> sh
```

Para matar um container

```
docker kill <container_id>
```
