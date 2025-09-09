import { NestFactory } from "@nestjs/core";
import { Context, Handler } from "aws-lambda";
import { config } from "dotenv";
import serverless from "serverless-http";
import { filtersConfig } from "@/common/configs/filter.config";
import { validationConfig } from "@/common/configs/validation.config";
import { AppModule } from "./app.module";

config();

let cachedHandler: Handler | null = null;

async function bootstrap(): Promise<Handler> {
  if (cachedHandler) {
    return cachedHandler;
  }
  const app = await NestFactory.create(AppModule, { cors: { origin: "*" } });
  validationConfig(app);
  filtersConfig(app);
  await app.init();
  const expressInstance = app.getHttpAdapter().getInstance();
  cachedHandler = serverless(expressInstance);
  return cachedHandler;
}

export const handler: Handler = async (event: any, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const h = await bootstrap();
  return h(event, context, () => {});
};
