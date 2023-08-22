import { Module } from '@nestjs/common';
import { DeviceTypesController } from './device_types.controller';
import { DeviceTypesService } from './device_types.service';

@Module({
  controllers: [DeviceTypesController],
  providers: [DeviceTypesService]
})
export class DeviceTypesModule {}
