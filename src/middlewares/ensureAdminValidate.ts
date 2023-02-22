import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const ensureAdminValidate = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const admin: boolean = request.user.admin;
  if (admin !== true) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};
