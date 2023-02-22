import { QueryResult } from "pg";
import { z } from "zod";
import {
  createUserSchema,
  returnUserSchema,
  userOmitPassword,
  allUserSchema,
} from "../schemas/users.schemas";

export type IUserRequest = z.infer<typeof createUserSchema>;

export type IUser = z.infer<typeof returnUserSchema>;

export type IUserOmitPassword = z.infer<typeof userOmitPassword>;

export type IUserResult = QueryResult<IUserOmitPassword>;
export type IUserWithPassResult = QueryResult<IUser>;

export type IAllUser = z.infer<typeof allUserSchema>;
