import { Router } from "express";
import {
  createUserController,
  deleteUsersController,
  updateUsersController,
  listUsersController,
  listUserProfileController,
} from "../controllers/users.controllers";
import { ensureUsersExists } from "../middlewares/ensureUsersExists";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid";
import { ensureTokenIsValid } from "../middlewares/tokenIsValid.middleware";
import { createUserSchema } from "../schemas/users.schemas";
import { ensureAdminValidate } from "../middlewares/ensureAdminValidate";
import { ensureLoggedAdmin } from "../middlewares/ensureLoggedAdmin";

export const userRoutes: Router = Router();

userRoutes.post("", ensureDataIsValid(createUserSchema), createUserController);
userRoutes.get(
  "",
  ensureTokenIsValid,
  ensureAdminValidate,
  listUsersController
);
userRoutes.patch("/:id", updatePartialController);
userRoutes.delete(
  "/:id",
  ensureUsersExists,
  ensureTokenIsValid,
  ensureLoggedAdmin,
  deleteUsersController
);
userRoutes.put(
  "/:id/recover",
  ensureUsersExists,
  ensureTokenIsValid,
  ensureAdminValidate,
  updateUsersController
);
userRoutes.get("/profile", ensureTokenIsValid, listUserProfileController);
