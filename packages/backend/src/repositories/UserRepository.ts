import { type PrismaClient, User } from '../../prisma/generated/prisma-client';

export class UserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}
  async findUserById(id: string) {
    return this.prismaClient.user.findUnique({
      where: { id },
    });
  }
  async createOne(args: {
    id: string;
    email: string;
    name: string;
    image: string;
  }) {
    return this.prismaClient.user.create({
      data: {
        ...args,
      },
    });
  }
}
