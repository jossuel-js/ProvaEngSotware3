import { CreateUserDTO } from "../DTOs/CreateUserDTO";
import { IUserResponse } from "../DTOs/IUserResponse";
import { User } from "../entities/User";

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<User | null>;
  findById(id: string): Promise<IUserResponse | null>;
  findByEmail(email: string): Promise<IUserResponse | null>;
  findAllUser(): Promise<IUserResponse[]>;
}
