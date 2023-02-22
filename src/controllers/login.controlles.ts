import { Request, Response } from "express";
import { createLoginServices } from "../services/login/createLogin.services";

export const createLoginController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const token = await createLoginServices(request.body);
  return response.json({
    token: token,
  });
};
