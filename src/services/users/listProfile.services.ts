import { QueryConfig } from "pg";
import { client } from "../../database";
import {
  IUserResult,
  IUserOmitPassword,
} from "../../interfaces/users.interfaces";

export const listUserProfileService = async (
  userId: string
): Promise<IUserOmitPassword> => {
  const queryString: string = `
        SELECT
            "id", "name", "email" , "admin", "active"
        FROM
            users
        WHERE
            id = $1;
`;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: IUserResult = await client.query(queryConfig);

  return queryResult.rows[0];
};
