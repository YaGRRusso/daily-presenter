import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const swaggerConfig = (app: INestApplication) => {
  const swaggerConf = new DocumentBuilder()
    .setTitle("Daily Presenter")
    .setDescription(
      "API para gerenciar e gerar convocações randomicas de usuários, com autenticação JWT, controle de acesso baseado em funções e segurança com hash de senha."
    )
    .setVersion("1.0")
    .addTag("App")
    .addTag("Auth")
    .addTag("Users")
    .addTag("Convocations")

    .build();
  const document = SwaggerModule.createDocument(app, swaggerConf);

  // const json = JSON.stringify(document, null, 2)
  // fs.writeFileSync('swagger.json', json)

  return SwaggerModule.setup("swagger", app, document);
};
