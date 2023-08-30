import { IsInt, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class FindAllDevicesDto {
    @IsInt()
    @IsOptional()
    @Type(() => Number)
    page: number;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    limit: number;
}
