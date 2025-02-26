# Daily Presenter

Este projeto é uma aplicação backend desenvolvida com o framework [NestJS](https://nestjs.com/). Ele fornece uma API para gerenciar e gerar convocações randomicas de usuários, com autenticação JWT, controle de acesso baseado em funções e segurança com hash de senha.

## Tecnologias Utilizadas

- **NestJS**: Um framework Node.js para construir aplicações server-side eficientes e escaláveis. Utiliza TypeScript por padrão e é inspirado no Angular.
- **Mongoose**: Uma biblioteca de modelagem de dados para MongoDB e Node.js. Facilita a interação com o banco de dados MongoDB.
- **JWT (JSON Web Token)**: Utilizado para autenticação e autorização de usuários. Permite a criação de tokens seguros para a comunicação entre cliente e servidor.
- **Class Validator**: Biblioteca para validação de objetos JavaScript, utilizada para garantir que os dados recebidos nas requisições estejam no formato correto.
- **Bcrypt**: Biblioteca para hashing de senhas, garantindo a segurança das senhas armazenadas no banco de dados.

## Documentação Swagger

Este projeto foi feito utilizando a biblioteca Swagger, que facilita a documentação de cada rota da aplicação incluindo tipagem de `Body`, `Parameter`, `Response` e `Header` de requisições.

[**Acesse a documentação da API no Swagger**](http://ec2-18-228-3-189.sa-east-1.compute.amazonaws.com:3000/swagger)

## Instalação

```bash
$ npm install
```

## Executando a Aplicação

```bash
# desenvolvimento
$ npm run start

# modo watch
$ npm run start:dev

# produção
$ npm run start:prod
```

## Endpoints

### Autenticação

- **POST /auth**

- **GET /auth/me**

- **GET /auth/manager**

- **GET /auth/admin**

- **GET /auth/super**

### Usuários

- **POST /users**

- **GET /users**

- **GET /users/:id**

- **PATCH /users**

- **DELETE /users**

### Convocações

- **POST /convocations**

- **GET /convocations**

- **GET /convocations/:id**

- **PATCH /convocations/:id**

- **DELETE /convocations/:id**

## Licença

Nest é licenciado pelo MIT.
