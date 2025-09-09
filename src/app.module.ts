import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { config } from "dotenv";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/guards/jwt.guard";
import { ConvocationsModule } from "./convocations/convocations.module";
import { UsersModule } from "./users/users.module";

config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not defined");
}

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
    }),
    UsersModule,
    AuthModule,
    ConvocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
