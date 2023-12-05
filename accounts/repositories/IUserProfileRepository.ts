import { CreateUserProfileDTO } from "../DTOs/CreateUserProfileDTO";
import { IUserProfileResponse } from "../DTOs/IUserProfileResponse";
import { UserProfile } from "../entities/UserProfile";

export interface IUserProfileRepository {
  create(data: CreateUserProfileDTO): Promise<UserProfile | null>;
  findById(id: string): Promise<IUserProfileResponse | null>;
}
