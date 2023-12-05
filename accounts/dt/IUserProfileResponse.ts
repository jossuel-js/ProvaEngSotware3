import { User } from "../entities/User";

export interface IUserProfileResponse {
  id: string;
  profilePictureUrl: string | null;
  userId: string;
  user?: User;
}
