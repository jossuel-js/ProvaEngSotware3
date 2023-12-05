import { prisma } from "../../../../database/prismaClient";
import { CreateUserProfileDTO } from "../../DTOs/CreateUserProfileDTO";
import { IUserProfileResponse } from "../../DTOs/IUserProfileResponse";
import { UserProfile } from "../../entities/UserProfile";
import { IUserProfileRepository } from "../IUserProfileRepository";

export class UserProfileRepository implements IUserProfileRepository {
  async create({
    userId,
    profilePictureUrl,
  }: CreateUserProfileDTO): Promise<UserProfile> {
    const newUserProfile = await prisma.userProfile.create({
      data: {
        userId,
        profilePictureUrl,
      },
    });

    return newUserProfile;
  }

  async findById(id: string): Promise<IUserProfileResponse | null> {
    const user = await prisma.userProfile.findUnique({
      where: { id },
      include: { user: true },
    });

    return user;
  }
}
