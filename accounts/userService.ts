import { inject, injectable } from "tsyringe";
import { AppError } from "../../Errors/AppError";
import { INJECTS } from "../../shared/container";
import { IUserProfileResponse } from "./DTOs/IUserProfileResponse";
import { IUserResponse } from "./DTOs/IUserResponse";
import { IUserProfileRepository } from "./repositories/IUserProfileRepository";
import { IUserRepository } from "./repositories/IUserRepository";

interface ICreateUser {
  name: string;
  email: string;
  profilePictureUrl: string | undefined;
  password: string;
}

@injectable()
export class UserService {
  constructor(
    @inject(INJECTS.USER_REPO)
    private userRepository: IUserRepository,
    @inject(INJECTS.USERPROFILE_REPO)
    private userProfileRepository: IUserProfileRepository
  ) {}

  findUserByEmail = async (email: string): Promise<IUserResponse> => {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Usuário não encontrado!", 404);
    }

    return user;
  };

  findUserById = async (id: string): Promise<IUserResponse> => {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado!", 404);
    }

    return user;
  };

  findUserProfileById = async (id: string): Promise<IUserProfileResponse> => {
    const user = await this.userProfileRepository.findById(id);

    if (!user) {
      throw new AppError("Perfil de usuário não encontrado!", 404);
    }

    return user;
  };

  findAllUsers = async (): Promise<IUserResponse[]> => {
    const users = await this.userRepository.findAllUser();

    return users;
  };
}
