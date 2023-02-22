import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { AppError } from "../../errors";

export const updateUsersService = async (userId: number): Promise<void> => {
  const queryStringIsActive: string = `
        SELECT
            *
        FROM
            users
        WHERE
            id = $1;
    `;

  const queryConfigIsActive: QueryConfig = {
    text: queryStringIsActive,
    values: [userId],
  };

  const queryResultIsActive: QueryResult = await client.query(
    queryConfigIsActive
  );

  if (!!queryResultIsActive.rows[0].active) {
    throw new AppError("User already active", 400);
  }

  const queryString: string = `
        UPDATE
            users
        SET
            "active" = true
        WHERE
            id = $1
        RETURNING "id", "name", "email", "admin", "active";
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  return queryResult.rows[0];
};
