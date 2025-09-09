import { INestApplication, ValidationPipe } from "@nestjs/common";

export const validationConfig = (app: INestApplication) => {
  return app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const { target: _target, ...error } = errors[0];
        return error;
      },
    })
  );
};
