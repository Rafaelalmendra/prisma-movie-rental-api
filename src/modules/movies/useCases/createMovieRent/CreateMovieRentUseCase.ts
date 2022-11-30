import { prisma } from "../../../../prisma/client";

import { AppError } from "../../../../erros/AppError";

import { CreateMovieRentDTO } from "../../dtos/CreateMovieRentDTO";

export class CreateMovieRentUseCase {
  async execute({ movieId, userId }: CreateMovieRentDTO): Promise<void> {
    const movieExists = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movieExists) {
      throw new AppError("Movie does not exist");
    }

    const movieAltearyRented = await prisma.movieRent.findFirst({
      where: {
        movieId,
      },
    });

    if (movieAltearyRented) {
      throw new AppError("Movie already rented");
    }

    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new AppError("User does not exist");
    }

    await prisma.movieRent.create({
      data: {
        movieId,
        userId,
      },
    });
  }
}
