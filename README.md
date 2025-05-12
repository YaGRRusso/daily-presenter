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
  Realiza o login do usuário e retorna um token JWT.

- **GET /auth/me**  
  Retorna os dados do usuário autenticado.

- **GET /auth/manager**  
  Retorna o papel do usuário, acessível apenas para usuários com papel de gerente (manager) ou superior.

- **GET /auth/admin**  
  Retorna o papel do usuário, acessível apenas para administradores (admin) ou superior.

- **GET /auth/super**  
  Retorna o papel do usuário, acessível apenas para super administradores (super).

### Usuários

- **POST /users**  
  Cria um novo usuário.

- **GET /users**  
  Lista todos os usuários cadastrados.

- **GET /users/:id**  
  Busca um usuário pelo seu ID.

- **PATCH /users/me**  
  Atualiza os dados do usuário autenticado.

- **DELETE /users/me**  
  Remove o usuário autenticado do sistema.

### Convocações

- **POST /convocations**  
  Cria uma nova convocação ou retorna uma existente com a mesma chave.

- **GET /convocations**  
  Lista todas as convocações.

- **GET /convocations/:id**  
  Busca uma convocação pelo seu ID.

- **GET /convocations/key/:id**  
  Busca uma convocação pela sua chave única.

- **PATCH /convocations/:id**  
  Atualiza os dados de uma convocação (apenas admin ou super).

- **DELETE /convocations/:id**  
  Remove uma convocação (apenas admin ou super).

## Licença

Nest é licenciado pelo MIT.
