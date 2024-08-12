import { INestApplication, ValidationPipe } from '@nestjs/common'

export const validationConfig = (app: INestApplication) => {
  return app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const error = errors[0]
        delete error.target
        return error
      },
    }),
  )
}
