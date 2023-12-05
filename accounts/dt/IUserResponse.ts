import { CompanyProfile, UserProfile } from "@prisma/client";

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmationToken: string | null;
  userProfile?: UserProfile | null;
  companyProfile?: CompanyProfile;
}
