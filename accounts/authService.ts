import { compare, hashSync } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import jwtSecret from "../../config/jwtSecret";
import { prisma } from "../../database/prismaClient";
import { AppError } from "../../Errors/AppError";
import { INJECTS } from "../../shared/container";
import { SendEmail } from "../../util/nodemailer";
import { IUserRequest } from "./DTOs/IUserRequest";
import { IUserProfileRepository } from "./repositories/IUserProfileRepository";
import { IUserRepository } from "./repositories/IUserRepository";

interface IResponse {
  user: {
    email: string;
    name: string;
    profilePictureUrl: string | null | undefined;
  };

  token: string;
}

interface IPayload {
  email: string;
}

@injectable()
export class AuthService {
  constructor(
    @inject(INJECTS.USER_REPO)
    private userRepository: IUserRepository,
    @inject(INJECTS.USERPROFILE_REPO)
    private userProfileRepository: IUserProfileRepository
  ) {}

  signUp = async ({
    name,
    email,
    password,
    profilePictureUrl,
  }: IUserRequest) => {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new AppError("Usuário já possui uma conta");
    }

    const passwordHash = hashSync(password, 8);

    const token = sign({ email: email }, jwtSecret.jwt_access_secret, {
      expiresIn: jwtSecret.expires_in_token,
    });

    const newUser = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      confirmationToken: token,
    });

    if (!newUser) {
      throw new AppError("Erro ao criar usuário");
    }

    const sendEmail = new SendEmail();
    sendEmail.sendMail(
      "Verificação de email",
      email,
      "email-confirmation",
      newUser.confirmationToken as string
    );

    const userProfile = await this.userProfileRepository.create({
      userId: newUser.id as string,
      profilePictureUrl,
    });
  };

  signIn = async (email: string, password: string) => {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email ou senha incorretos!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email ou senha incorretos!");
    }

    const token = sign(
      {
        userId: user.id,
        userProfileId: user.userProfile?.id,
        email: user.email,
      },
      jwtSecret.jwt_access_secret,
      {
        subject: user.userProfile?.id,
        expiresIn: jwtSecret.expires_in_token,
      }
    );

    const tokenReturn: IResponse = {
      user: {
        email: user.email,
        name: user.name,
        profilePictureUrl: user.userProfile?.profilePictureUrl,
      },
      token,
    };

    return tokenReturn;
  };

  confirmEmail = async (token: string) => {
    const { email } = verify(token, jwtSecret.jwt_access_secret) as IPayload;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Erro");
    }

    // Criar um método no repository
    await prisma.user.update({
      where: { id: user.id },
      data: {
        activated: true,
        confirmationToken: null,
      },
    });
  };
}
