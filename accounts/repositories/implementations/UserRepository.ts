import { prisma } from "../../../../database/prismaClient";
import { CreateUserDTO } from "../../DTOs/CreateUserDTO";
import { IUserResponse } from "../../DTOs/IUserResponse";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

export class UserRepository implements IUserRepository {
  async create({
    name,
    email,
    password,
    confirmationToken,
  }: CreateUserDTO): Promise<User | null> {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        confirmationToken,
      },
    });

    return newUser;
  }

  async findByEmail(email: string): Promise<IUserResponse | null> {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { userProfile: true },
    });

    return user;
  }

  async findById(id: string): Promise<IUserResponse | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { userProfile: true, companyProfile: true },
    });

    return user;
  }

  async findAllUser(): Promise<IUserResponse[]> {
    const users = await prisma.user.findMany({
      where: { admin: false },
      include: { userProfile: true },
    });

    return users;
  }
}
