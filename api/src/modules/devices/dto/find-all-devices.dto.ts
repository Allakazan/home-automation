import { PaginationDto } from '../../database/prisma/pagination/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class FindAllDevicesDto extends PaginationDto {
  @IsString()
  @IsOptional()
  name: string;
}
