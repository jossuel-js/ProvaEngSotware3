import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserService } from "./userService";

export class UserController {
  private userService: UserService;
  constructor() {
    this.userService = container.resolve(UserService);
  }

  getUserProfile = async (req: Request, res: Response) => {
    const { id } = req.params;

    const userProfile = await this.userService.findUserProfileById(id);

    return res.status(200).json(userProfile);
  };

  getUsers = async (req: Request, res: Response) => {
    const users = await this.userService.findAllUsers();

    return res.status(200).json(users);
  };
}
