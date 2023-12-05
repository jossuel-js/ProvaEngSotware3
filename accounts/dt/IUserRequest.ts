export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  confirmationToken?: string;
  profilePictureUrl?: string;
}
