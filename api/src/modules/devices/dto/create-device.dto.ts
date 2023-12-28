import { IsString, IsNotEmpty } from 'class-validator';
import { IsCUID } from '@/common/decorators/IsCUID';

export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsCUID()
  deviceTypeId: string;

  @IsString()
  @IsCUID()
  roomId: string;

  @IsString()
  @IsCUID()
  userId: string;
}
