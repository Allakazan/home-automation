import { IsString, IsNotEmpty } from 'class-validator';
import { IsCUID } from '@/common/decorators/IsCUID';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsCUID()
  @ApiProperty()
  deviceTypeId: string;

  @IsString()
  @IsCUID()
  @ApiProperty()
  roomId: string;

  @IsString()
  @IsCUID()
  @ApiProperty()
  userId: string;
}
