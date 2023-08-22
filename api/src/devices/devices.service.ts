import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, MongoRepository, UpdateResult } from 'typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: MongoRepository<Device>,
  ) {}

  create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    return this.deviceRepository.save(createDeviceDto as Device)
  }

  findAll(): Promise<Array<Device>> {
    return this.deviceRepository.find();
  }

  findOne(id: string): Promise<Device> {
    return this.deviceRepository.findOne({where: { _id: new ObjectId(id) }})
  }

  update(id: string, updateDeviceDto: UpdateDeviceDto): Promise<UpdateResult> {
    return this.deviceRepository.update(id, updateDeviceDto)
  }

  remove(id: string): Promise<DeleteResult> {
    return this.deviceRepository.delete(id);
  }
}
