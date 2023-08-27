import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateDeviceDto {
    
    @IsString()
    @IsNotEmpty()
    room: string;

    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    type: string;
}
