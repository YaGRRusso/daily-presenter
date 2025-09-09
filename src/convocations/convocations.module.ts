import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Convocation, ConvocationSchema } from "@/schemas/convocation.schema";
import { UsersModule } from "@/users/users.module";
import { ConvocationsController } from "./convocations.controller";
import { ConvocationsService } from "./convocations.service";

// imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
// controllers: [UsersController],
// providers: [UsersService],
// exports: [UsersService],

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Convocation.name, schema: ConvocationSchema },
    ]),
  ],
  controllers: [ConvocationsController],
  providers: [ConvocationsService],
})
export class ConvocationsModule {}
