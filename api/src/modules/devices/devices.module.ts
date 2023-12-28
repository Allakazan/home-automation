import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
