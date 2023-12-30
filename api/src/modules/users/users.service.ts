import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUsersDto } from './dto/find-all-users.dto';
import { Pagination, Page } from '../database/prisma/pagination/pagination';
import { hashed } from '@/common/directives/crypto.directive';

export const userRelations = Prisma.validator<Prisma.UserDefaultArgs>()({});

@Injectable()
export class UsersService {
  select: Prisma.UserDefaultArgs['select'];

  constructor(private prisma: PrismaService) {
    this.select = this.prisma.client.user.exclude([
      'password',
      'refreshToken',
      'archived',
      'updatedAt',
    ]);
  }

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
        select: this.select,
        ...paginator.filterProps(),
        where,
        orderBy: { createdAt: 'asc' },
      }),
    );
  }

  findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      select: this.select,
      where: { id },
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  getRefreshTokenById(id: string): Promise<Pick<User, 'refreshToken'> | null> {
    return this.prisma.user.findUnique({
      select: {
        refreshToken: true,
      },
      where: { id },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await hashed(createUserDto.password),
    };

    return this.prisma.user.create({
      data,
      select: this.select,
    });
  }

  async update(
    id: string,
    { password, ...updateUserDto }: UpdateUserDto,
  ): Promise<User> {
    const data: Prisma.UserUpdateInput = {
      ...updateUserDto,
    };

    return this.prisma.user.update({
      data,
      select: this.select,
      where: { id },
    });
  }

  updateRefreshToken(id: string, refreshToken: string): Promise<User> {
    return this.prisma.user.update({
      data: {
        refreshToken,
      },
      where: { id },
    });
  }

  remove(id: string): Promise<User> {
    return this.prisma.client.user.softDelete({ id }, this.select);
  }
}
