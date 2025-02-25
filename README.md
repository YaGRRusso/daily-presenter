## Descrição

Este projeto é uma aplicação backend desenvolvida com o framework [NestJS](https://nestjs.com/). Ele fornece uma API para gerenciar convocações e usuários, com autenticação JWT e controle de acesso baseado em funções.

### Tecnologias Utilizadas

- **NestJS**: Um framework Node.js para construir aplicações server-side eficientes e escaláveis. Utiliza TypeScript por padrão e é inspirado no Angular.
- **Mongoose**: Uma biblioteca de modelagem de dados para MongoDB e Node.js. Facilita a interação com o banco de dados MongoDB.
- **JWT (JSON Web Token)**: Utilizado para autenticação e autorização de usuários. Permite a criação de tokens seguros para a comunicação entre cliente e servidor.
- **Class Validator**: Biblioteca para validação de objetos JavaScript, utilizada para garantir que os dados recebidos nas requisições estejam no formato correto.
- **Bcrypt**: Biblioteca para hashing de senhas, garantindo a segurança das senhas armazenadas no banco de dados.

## Endpoints

### Autenticação

- **POST /auth**

  - Descrição: Realiza o login do usuário.
  - Corpo da Requisição:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - Resposta: Token JWT.

- **GET /auth/me**

  - Descrição: Retorna as informações do usuário autenticado.
  - Cabeçalho: `Authorization: Bearer <token>`

- **GET /auth/manager**

  - Descrição: Retorna a função do usuário autenticado se ele for um gerente.
  - Cabeçalho: `Authorization: Bearer <token>`

- **GET /auth/admin**

  - Descrição: Retorna a função do usuário autenticado se ele for um administrador.
  - Cabeçalho: `Authorization: Bearer <token>`

- **GET /auth/super**
  - Descrição: Retorna a função do usuário autenticado se ele for um super usuário.
  - Cabeçalho: `Authorization: Bearer <token>`

### Usuários

- **POST /users**

  - Descrição: Cria um novo usuário.
  - Corpo da Requisição:
    ```json
    {
      "username": "string",
      "name": "string",
      "email": "string",
      "password": "string",
      "avatar": "string (opcional)"
    }
    ```

- **GET /users**

  - Descrição: Retorna todos os usuários.
  - Corpo da Requisição (opcional):
    ```json
    {
      "username": "string (opcional)",
      "name": "string (opcional)",
      "email": "string (opcional)"
    }
    ```

- **GET /users/:id**

  - Descrição: Retorna um usuário pelo ID.

- **PATCH /users**

  - Descrição: Atualiza as informações do usuário autenticado.
  - Cabeçalho: `Authorization: Bearer <token>`
  - Corpo da Requisição:
    ```json
    {
      "username": "string (opcional)",
      "name": "string (opcional)",
      "email": "string (opcional)",
      "password": "string (opcional)",
      "avatar": "string (opcional)"
    }
    ```

- **DELETE /users**
  - Descrição: Remove o usuário autenticado.
  - Cabeçalho: `Authorization: Bearer <token>`

### Convocações

- **POST /convocations**

  - Descrição: Cria uma nova convocação ou retorna uma existente.
  - Cabeçalho: `Authorization: Bearer <token>`
  - Corpo da Requisição:
    ```json
    {
      "key": "string",
      "name": "string",
      "invitedUsers": ["string"],
      "expiresAt": "string (opcional)",
      "selectedLength": "number (opcional)"
    }
    ```

- **GET /convocations**

  - Descrição: Retorna todas as convocações.
  - Corpo da Requisição (opcional):
    ```json
    {
      "key": "string (opcional)",
      "name": "string (opcional)"
    }
    ```

- **GET /convocations/:id**

  - Descrição: Retorna uma convocação pelo ID.

- **PATCH /convocations/:id**

  - Descrição: Atualiza uma convocação pelo ID.
  - Cabeçalho: `Authorization: Bearer <token>`
  - Corpo da Requisição:
    ```json
    {
      "name": "string (opcional)",
      "expiresAt": "string (opcional)"
    }
    ```

- **DELETE /convocations/:id**
  - Descrição: Remove uma convocação pelo ID.
  - Cabeçalho: `Authorization: Bearer <token>`

## Instalação

```bash
$ npm install
```

## Executando a aplicação

```bash
# desenvolvimento
$ npm run start

# modo watch
$ npm run start:dev

# produção
$ npm run start:prod
```

## Licença

Nest é licenciado pelo MIT.
