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

[**Acesse a documentação da API no Swagger**](http://ec2-18-231-212-234.sa-east-1.compute.amazonaws.com:3000/swagger)

## Instalação

```bash
$ npm install
```

## Execução Local (Lambda simulation)

```bash
# build
npm run build

# lambda offline
export DATABASE_URL='mongodb://localhost:27017/daily'
npm run offline
```

## Deploy AWS Lambda (produção única)

Pré-requisitos:

- Credenciais AWS configuradas (AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY) ou SSO/Role assumida.
- Parâmetros seguros em SSM Parameter Store (produção).

Criação dos parâmetros (uma vez):

```bash
aws ssm put-parameter --name /daily-presenter/prod/DATABASE_URL --type SecureString --value 'mongodb+srv://...'
aws ssm put-parameter --name /daily-presenter/prod/JWT_SECRET --type SecureString --value 'super-secret'
```

Deploy:

```bash
npm run deploy
```

Após o deploy, o output mostra HttpApiUrl. Teste:

```bash
curl -i https://<api-id>.execute-api.sa-east-1.amazonaws.com/
```

Rollback:

```bash
serverless deploy list
serverless deploy rollback -t <timestamp>
```

## Licença

Nest é licenciado pelo MIT.
