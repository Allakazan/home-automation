import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { DevicesModule } from './modules/devices/devices.module';

@Module({
  imports: [DatabaseModule, UsersModule, DevicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
