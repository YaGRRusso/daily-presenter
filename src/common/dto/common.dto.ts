import { IsDate, IsOptional } from 'class-validator'

export class CommonDto {
  @IsOptional()
  @IsDate()
  createdAt: Date

  @IsOptional()
  @IsDate()
  updatedAt: Date
}
