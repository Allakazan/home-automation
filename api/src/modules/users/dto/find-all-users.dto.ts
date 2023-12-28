import { PaginationDto } from '../../database/prisma/pagination/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class FindAllUsersDto extends PaginationDto {
  @IsString()
  @IsOptional()
  name: string;
}
