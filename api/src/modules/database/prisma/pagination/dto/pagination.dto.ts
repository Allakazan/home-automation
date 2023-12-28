import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { IsInt, IsOptional } from 'class-validator';
import { Type, plainToInstance } from 'class-transformer';

export class PaginationDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  page: number;
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  limit: number;
}

@Injectable()
export class PaginationTransformPipe implements PipeTransform {
  async transform(dto: PaginationDto, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return dto;
    }

    return plainToInstance(metatype, dto);
  }
}
