import { Request, Response } from "express";
import { createUserService } from "../services/users/createUsers.services";
import { IUserRequest } from "../interfaces/users.interfaces";
import { deleteUserServices } from "../services/users/deleteUser.services";
import { listUsersService } from "../services/users/listUsers.services";
import { updateUsersService } from "../services/users/update.sevices";
import { listUserProfileService } from "../services/users/listProfile.services";
import { updatePartialServices } from "../services/users/updatePartial.services";

export const createUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData: IUserRequest = request.body;

  const newUser = await createUserService(userData);
  return response.status(201).json(newUser);
};

export const listUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const users = await listUsersService();
  return response.json(users);
};

export const deleteUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: number = parseInt(request.params.id);

  await deleteUserServices(userId);

  return response.status(204).send();
};

export const updateUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: number = parseInt(request.params.id);

  const newUser = await updateUsersService(userId);
  return response.json(newUser);
};

export const listUserProfileController = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const userId: string = req.user.id;
  const user = await listUserProfileService(userId);
  console.log(user);

  return resp.json(user);
};

export const updatePartialUserController = async (
  req: Request,
  resp: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  const userData: IUserRequest = req.body;
  const changeUserData = await updatePartialServices(userId, userData);

  return resp.json(changeUserData);
};
