import { Injectable } from '@nestjs/common';
import { Prisma, Device } from '@prisma/client';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { FindAllDevicesDto } from './dto/find-all-devices.dto';
import { Pagination, Page } from '../database/prisma/pagination/pagination';

export const deviceRelations = Prisma.validator<Prisma.DeviceDefaultArgs>()({
  include: {
    type: {
      select: {
        id: true,
        title: true,
        type: true,
        icon: true,
        actions: {
          select: {
            action: true,
            label: true,
            input: true,
          },
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

@Injectable()
export class DevicesService {
  constructor(private prisma: PrismaService) {}

  totalRecords(where: Prisma.DeviceWhereInput = {}) {
    return this.prisma.device.count({
      where,
    });
  }

  async findAll(
    findAllDevicesDto: FindAllDevicesDto,
  ): Promise<Page<Prisma.DeviceGetPayload<typeof deviceRelations>>> {
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

    return paginator.buildPage<Prisma.DeviceGetPayload<typeof deviceRelations>>(
      await this.prisma.device.findMany({
        ...deviceRelations,
        ...paginator.filterProps(),
        where,
        orderBy: { createdAt: 'asc' },
      }),
    );
  }

  findOne(
    id: string,
  ): Promise<Prisma.DeviceGetPayload<typeof deviceRelations> | null> {
    return this.prisma.device.findUnique({ ...deviceRelations, where: { id } });
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
