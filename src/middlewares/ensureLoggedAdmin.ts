import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const ensureLoggedAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const admin: boolean = request.user.admin;
  const idParams: number = parseInt(request.params.id);
  const idUser: string = request.user.id;

  if (admin === true) {
    return next();
  }

  if (idParams !== parseInt(idUser)) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};
