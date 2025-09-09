import { NestFactory } from "@nestjs/core";

import { appConfig } from "@/common/configs/app.config";
import { filtersConfig } from "@/common/configs/filter.config";
import { swaggerConfig } from "@/common/configs/swagger.config";
import { validationConfig } from "@/common/configs/validation.config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "*",
    },
  });

  swaggerConfig(app);
  validationConfig(app);
  filtersConfig(app);
  await appConfig(app);
}
bootstrap();
