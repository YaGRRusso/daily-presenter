import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export const swaggerConfig = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Daily Presenter')
    .setDescription('Api de randomização de usuários baseado em chaves')
    .setVersion('1.0')
    .addTag('App')
    .addTag('Auth')
    .addTag('Users')
    .addTag('Convocations')

    .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)

  // const json = JSON.stringify(document, null, 2)
  // fs.writeFileSync('swagger.json', json)

  return SwaggerModule.setup('swagger', app, document)
}
