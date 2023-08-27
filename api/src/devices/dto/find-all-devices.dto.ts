import { IsInt } from "class-validator";
import { Type } from "class-transformer";

export class FindAllDevicesDto {
    @IsInt()
    @Type(() => Number)
    page: number;

    @IsInt()
    @Type(() => Number)
    limit: number;
}
