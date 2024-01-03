import { PaginationDto } from '../../database/prisma/pagination/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindAllDevicesDto extends PaginationDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name: string;
}
