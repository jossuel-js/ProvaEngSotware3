import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthService } from "./authService";

export class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = container.resolve(AuthService);
  }

  signUp = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    let url: string | undefined;

    req.imgUrl ? (url = req.imgUrl.url) : (url = undefined);

    await this.authService.signUp({
      name,
      email,
      password,
      profilePictureUrl: url,
    });

    return res.status(201).send();
  };

  signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const token = await this.authService.signIn(email, password);

    return res.status(200).json(token);
  };

  confirmEmail = async (req: Request, res: Response) => {
    const { token } = req.params;

    await this.authService.confirmEmail(token);

    return res.status(200).json({ message: "Email confirmado com sucesso!" });
  };
}
