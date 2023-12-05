export class User {
  id?: string;
  name!: string;
  email!: string;
  password!: string;
  admin!: boolean;
  activated!: boolean;
  confirmationToken!: string | null;
  createdAt?: Date;
  updateA?: Date;
}
