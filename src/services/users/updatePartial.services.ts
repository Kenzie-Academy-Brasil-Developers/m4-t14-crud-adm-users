import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { AppError } from "../../errors";
import {
  IUserOmitPassword,
  IUserRequest,
  IUserResult,
} from "../../interfaces/users.interfaces";
import { userOmitPassword } from "../../schemas/users.schemas";

export const updatePartialServices = async (
  userId: number,
  userData: IUserRequest
): Promise<IUserOmitPassword> => {
  const queryStringUserExists: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1
    `;
  const queryConfigUserExists: QueryConfig = {
    text: queryStringUserExists,
    values: [userData.email],
  };

  const queryResultUserExists: QueryResult = await client.query(
    queryConfigUserExists
  );
  if (queryResultUserExists.rowCount > 0) {
    throw new AppError("User Already Exists!", 409);
  }

  const queryString: string = format(
    `
        UPDATE
            users
        SET(%I) = ROW(%L)
        WHERE
            id = $1
        RETURNING *;
    `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: IUserResult = await client.query(queryConfig);

  const newUser = userOmitPassword.parse(queryResult.rows[0]);

  return newUser;
};
