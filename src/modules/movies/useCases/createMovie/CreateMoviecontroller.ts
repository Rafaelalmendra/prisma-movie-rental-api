import { Request, Response } from "express";
import { CreateMovieUseCase } from "./CreateMovieUseCase";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { title, duration, release_date } = req.body;

    const createUserUseCase = new CreateMovieUseCase();

    const result = await createUserUseCase.execute({
      title,
      duration,
      release_date,
    });

    return res.status(201).json(result);
  }
}
