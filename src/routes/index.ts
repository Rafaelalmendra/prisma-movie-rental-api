import { Router } from "express";

//routes
import { userRoutes } from "./user.routes";
import { movieRoutes } from "./movie.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/movies", movieRoutes);

export { routes };
