import { Router } from "express";
import { createLoginController } from "../controllers/login.controlles";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid";
import { createLoginSchema } from "../schemas/login.schemas";

export const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  ensureDataIsValid(createLoginSchema),
  createLoginController
);
