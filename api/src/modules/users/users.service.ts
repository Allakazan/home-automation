import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { hash, genSalt } from 'bcrypt';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUsersDto } from './dto/find-all-users.dto';
import { Pagination, Page } from '../database/prisma/pagination/pagination';

const SALT_ROUNDS = 15;

export const userRelations = Prisma.validator<Prisma.UserDefaultArgs>()({});

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  totalRecords(where: Prisma.UserWhereInput = {}) {
    return this.prisma.user.count({
      where,
    });
  }

  async findAll(findAllUsersDto: FindAllUsersDto): Promise<Page<User>> {
    const where: Prisma.UserWhereInput = {};

    if (findAllUsersDto.name) {
      where.name = { contains: findAllUsersDto.name };
    }

    const paginator = new Pagination(
      findAllUsersDto.page,
      findAllUsersDto.limit,
      await this.totalRecords(),
      await this.totalRecords(where),
    );

    return paginator.buildPage<Prisma.UserGetPayload<typeof userRelations>>(
      await this.prisma.user.findMany({
        ...userRelations,
        ...paginator.filterProps(),
        where,
        orderBy: { createdAt: 'asc' },
      }),
    );
  }

  findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
    };

    data.password = await hash(
      createUserDto.password,
      await genSalt(SALT_ROUNDS),
    );

    return this.prisma.user.create({ data });
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const data: Prisma.UserUpdateInput = {
      ...updateUserDto,
    };

    return this.prisma.user.update({ data, where: { id } });
  }

  remove(id: string): Promise<User> {
    return this.prisma.client.user.softDelete({ id });
  }
}
