import { Injectable } from '@nestjs/common';
import { Prisma, Device } from '@prisma/client';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { FindAllDevicesDto } from './dto/find-all-devices.dto';
import { Pagination, Page } from '../database/prisma/pagination/pagination';

@Injectable()
export class DevicesService {
  args: Prisma.DeviceDefaultArgs;

  constructor(private prisma: PrismaService) {
    this.args = Prisma.validator<Prisma.DeviceDefaultArgs>()({
      select: {
        ...this.prisma.client.device.exclude([
          'archived',
          'updatedAt',
          'deviceTypeId',
          'roomId',
          'userId',
        ]),
        type: {
          select: {
            ...this.prisma.client.deviceType.exclude([]),
            actions: {
              select: this.prisma.client.deviceTypeAction.exclude([
                'id',
                'deviceTypeId',
              ]),
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        room: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  totalRecords(where: Prisma.DeviceWhereInput = {}) {
    return this.prisma.device.count({
      where,
    });
  }

  async findAll(findAllDevicesDto: FindAllDevicesDto): Promise<Page<Device>> {
    const where: Prisma.DeviceWhereInput = {};

    if (findAllDevicesDto.name) {
      where.name = { contains: findAllDevicesDto.name };
    }

    const paginator = new Pagination(
      findAllDevicesDto.page,
      findAllDevicesDto.limit,
      await this.totalRecords(),
      await this.totalRecords(where),
    );

    return paginator.buildPage<Prisma.DeviceGetPayload<typeof this.args>>(
      await this.prisma.device.findMany({
        ...this.args,
        ...paginator.filterProps(),
        where,
        orderBy: { createdAt: 'asc' },
      }),
    );
  }

  findOne(
    id: string,
  ): Promise<Prisma.DeviceGetPayload<typeof this.args> | null> {
    return this.prisma.device.findUnique({ ...this.args, where: { id } });
  }

  create({
    name,
    userId,
    roomId,
    deviceTypeId,
  }: CreateDeviceDto): Promise<Device> {
    const data: Prisma.DeviceCreateInput = {
      name: name,
      user: { connect: { id: userId } },
      room: { connect: { id: roomId } },
      type: { connect: { id: deviceTypeId } },
    };

    return this.prisma.device.create({ data });
  }

  update(
    id: string,
    { name, userId, roomId, deviceTypeId }: UpdateDeviceDto,
  ): Promise<Device> {
    const data: Prisma.DeviceUpdateInput = {};

    if (name) {
      data.name = name;
    }

    if (userId) {
      data.user = { connect: { id: userId } };
    }

    if (roomId) {
      data.room = { connect: { id: roomId } };
    }

    if (deviceTypeId) {
      data.type = { connect: { id: deviceTypeId } };
    }

    return this.prisma.device.update({ data, where: { id } });
  }

  remove(id: string) {
    return this.prisma.client.device.softDelete({ id });
  }
}
