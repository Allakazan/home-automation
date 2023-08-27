import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, MongoRepository, UpdateResult } from 'typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { FindAllDevicesDto } from './dto/find-all-devices.dto';
import { Device } from './entities/device.entity';
import { ObjectId } from 'mongodb';

import { Pagination } from 'src/types/pagination';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: MongoRepository<Device>,
  ) {}

  create(createDeviceDto: CreateDeviceDto, userID: string): Promise<Device> {
    const newEntity = createDeviceDto as Device;
    newEntity.userID = userID;

    return this.deviceRepository.save(newEntity)
  }

  async findAll(query: FindAllDevicesDto, userID: string): Promise<Pagination> {
    const page = query.page || 1;
    const limit = query.limit || 10;

    const [result, total] = await this.deviceRepository.findAndCount({
      where: { userID },
      take: limit,
      skip: (page - 1) * limit
    })

    return {
      data: result,
      pagination: {
        totalRecords: total,
        totalPages: Math.ceil(total/limit),
        currentPage: page
      }
    }
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
