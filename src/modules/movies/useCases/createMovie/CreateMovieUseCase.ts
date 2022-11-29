import { Movie } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

//dtos
import { CreateMovieDTO } from "../../dtos/CreateMovieDTO";

//errors
import { AppError } from "../../../../erros/AppError";

export class CreateMovieUseCase {
  async execute({
    title,
    duration,
    release_date,
  }: CreateMovieDTO): Promise<Movie> {
    const movieAlreadyExists = await prisma.movie.findUnique({
      where: {
        title,
      },
    });

    if (movieAlreadyExists) {
      throw new AppError("User already exists!");
    }

    const movie = await prisma.movie.create({
      data: {
        title,
        duration,
        release_date,
      },
    });

    return movie;
  }
}
