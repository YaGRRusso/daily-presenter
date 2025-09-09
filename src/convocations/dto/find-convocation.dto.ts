import { PartialType } from "@nestjs/swagger";
import { ConvocationDto } from "./convocation.dto";

export class FindConvocationDto extends PartialType(ConvocationDto) {}
