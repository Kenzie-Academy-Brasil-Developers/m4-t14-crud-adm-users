import {
  IUserOmitPassword,
  IUserRequest,
  IUserResult,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import format from "pg-format";
import { QueryConfig, QueryResult } from "pg";
import { AppError } from "../../errors";
import { userOmitPassword } from "../../schemas/users.schemas";

export const createUserService = async (
  userData: IUserRequest
): Promise<IUserOmitPassword> => {
  const queryStringUserExis: string = `
  SELECT
      *
  FROM
    users
  WHERE
    email = $1;
  `;

  const queryConfigUserExist: QueryConfig = {
    text: queryStringUserExis,
    values: [userData.email],
  };

  const queryResultUserExist: QueryResult = await client.query(
    queryConfigUserExist
  );

  if (queryResultUserExist.rowCount > 0) {
    throw new AppError("E-mail already registered", 409);
  }

  const queryString: string = format(
    `
  
  INSERT INTO 
      users(%I)
  VALUES(%L)
    RETURNING *;
  
  `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryResult: IUserResult = await client.query(queryString);

  const newUser = userOmitPassword.parse(queryResult.rows[0]);
  return newUser;
};
