import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export const ensureDataIsValid =
  (schema: ZodTypeAny) =>
  async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const validatedData = schema.parse(request.body);

    request.body = validatedData;

    return next();
  };
